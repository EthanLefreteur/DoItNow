<?php

namespace App\Controller;

use DateTime;
use DateInterval;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;

#[Route('/')]
class SecurityController extends AbstractController {
    public const USER_PERM = "USER";
    public const ADMIN_PERM = "ADMIN";

    public ?PasswordHasherFactory $passwordHasherFactory = null;

    public function __construct() {
        $this->passwordHasherFactory = new PasswordHasherFactory([
            // auto hasher with default options for the User class (and children)
            'mdp_hasher' => ['algorithm' => 'auto', 
                'cost' => 4, # Lowest possible value for bcrypt
                'time_cost' => 3, # Lowest possible value for argon
                'memory_cost' => 10, # Lowest possible value for argon
            ],
        ]);
    }

    public static function checkSecurity(EntityManagerInterface $entityManager,?string $token, string $perm): bool {

        if ($token == null) {
            return false;
        }

        $repo = $entityManager->getRepository(Utilisateur::class);
        $user = $repo->findOneBy(array('token_jwt' => $token));

        if ($user == null) {
            return false;
        }
        
        // never connected
        if ($user->getDateEcheanceToken() == null) {
            return false;
        }

        // expired
        if ($user->getDateEcheanceToken() < new DateTime()) {
            return false;
        }

        if ($perm == SecurityController::USER_PERM || $user->getRole() == $perm) {
            $date = new DateTime();
            $date = $date->add(new DateInterval("P1D"));
            $user->setDateEcheanceToken($date);
            $entityManager->flush();
            return true;
        }

        return false;
    }

    #[Route(path: "/login", name: 'app_login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $entityManager): JsonResponse {
        $identifant = $request->get("identifiant");
        $mdp = $request->get("mot_de_passe");

        if ($identifant == null || $mdp == null) {
            return $this->json([
                "code-erreur" => 400,
                "token" => '',
            ]);
        }

        $user = new Utilisateur();

        $userRepo = $entityManager->getRepository(Utilisateur::class);
        $user = $userRepo->findOneBy(array('identifiant' => $identifant));

        if ($user != null) {
            $passwordHasher = $this->passwordHasherFactory->getPasswordHasher('mdp_hasher');
            if (!$passwordHasher->verify($user->getMdp(), $mdp)) {
                return $this->json([
                    "code-erreur" => 401,
                    "token" => '',
                ]);
            }
            $date = new DateTime();
            $date = $date->add(new DateInterval("P1D"));
            $user->setDateEcheanceToken($date);

            $token = $this->getJWT($user->getIdentifiant(), $user->getDateEcheanceToken());
            $user->setTokenJwt($token);

            $entityManager->flush();

            return $this->json([
                "code-erreur" => 200,
                "token" => $token,
                "isAdmin" => $user->getRole() == "ADMIN",
            ]);
        }

        return $this->json([
            "code-erreur" => 401,
            "token" => '',
        ]);
    }

    #[Route(path: "/logout", name: 'app_logout', methods: ['POST'])]
    public function logout(Request $request, EntityManagerInterface $entityManager): JsonResponse {
        $token = $request->headers->get("Authorization");

        if ($token == null) {
            return $this->json([
                "code-erreur" => 401,
                "token" => '',
            ]);
        }

        $userRepo = $entityManager->getRepository(Utilisateur::class);
        $user = $userRepo->findOneBy(array('token_jwt' => $token));

        if ($user == null) {
            return $this->json([
                "code-erreur" => 401,
                "token" => '',
            ]);
        }

        $user->setDateEcheanceToken(new DateTime());
        $entityManager->flush();

        return $this->json([
            "code-erreur" => 200,
            "token" => '',
        ]);
    }

    #[Route(path: "/signin", name: 'app_signin', methods: ['POST'])]
    public function signin(Request $request, EntityManagerInterface $entityManager): JsonResponse {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 401,
            ]);
        }

        $identifant = $request->get("identifiant");
        $mdp = $request->get("mot_de_passe");
        $mail = $request->get("mail");
        $nom = $request->get("nom");
        $prenom = $request->get("prenom");

        if ($identifant == null || $mdp == null || $mail == null || $nom == null || $prenom == null) {
            return $this->json([
                "code-erreur" => 401,
                "token" => '',
            ]);
        }

        $userRepo = $entityManager->getRepository(Utilisateur::class);

        if ($userRepo->findOneBy(array('identifiant' => $identifant))) {
            return $this->json([
                "code-erreur" => 401,
                "token" => '',
            ]);
        }

        $passwordHasher = $this->passwordHasherFactory->getPasswordHasher('mdp_hasher');

        $user = new Utilisateur();

        $hashedPassword = $passwordHasher->hash( $mdp );

        $user->setAdresseMail($mail);
        $user->setIdentifiant($identifant);
        $user->setMdp($hashedPassword);
        $user->setRole("USER");
        $user->setNom($nom);
        $user->setPrenom($prenom);
        
        $date = new DateTime();
        $date = $date->add(new DateInterval("P1D"));
        $user->setDateEcheanceToken($date);

        $token = $this->getJWT($identifant, $user->getDateEcheanceToken());
        $user->setTokenJwt($token);

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            "code-erreur" => 200,
            "token" => $token,
        ]);
    }

    private function getJWT(string $identifiant, DateTime $expiration_date): string {
        return $this->gen_jwt(["identifiant" => $identifiant, "expiration_date" => $expiration_date]);
    }

    // Source - https://stackoverflow.com/a
    // Posted by cloudsurfin
    // Retrieved 2025-11-20, License - CC BY-SA 4.0

    function gen_jwt(array $payload): String{
        $signing_key = "changeme";
        $header = [ 
            "alg" => "HS512", 
            "typ" => "JWT" 
        ];
        $header = $this->base64_url_encode(json_encode($header));
        $payload = $this->base64_url_encode(json_encode($payload));
        $signature = $this->base64_url_encode(hash_hmac('sha512', "$header.$payload", $signing_key, true));
        $jwt = "$header.$payload.$signature";
        return $jwt;    
    }

    /**
     * per https://stackoverflow.com/questions/2040240/php-function-to-generate-v4-uuid/15875555#15875555
     */
    function base64_url_encode($text):String{
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
    }

}