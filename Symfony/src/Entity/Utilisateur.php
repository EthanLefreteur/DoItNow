<?php

namespace App\Entity;

use App\Repository\UtilisateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UtilisateurRepository::class)]
class Utilisateur
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $nom = null;

    #[ORM\Column(length: 50)]
    private ?string $prenom = null;

    #[ORM\Column(length: 100)]
    private string $identifiant = "";

    #[ORM\Column(length: 100)]
    private ?string $adresse_mail = null;

    #[ORM\Column(length: 100)]
    private ?string $mdp = null;

    #[ORM\Column(length: 100)]
    private ?string $role = null;

    /**
     * @var Collection<int, Tache>
     */
    #[ORM\OneToMany(targetEntity: Tache::class, mappedBy: 'utilisateur', orphanRemoval: true)]
    private Collection $taches;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $token_jwt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $date_echeance_token = null;

    public function __construct()
    {
        $this->taches = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getIdentifiant(): string
    {
        return $this->identifiant;
    }

    public function setIdentifiant(string $identifiant): static
    {
        $this->identifiant = $identifiant;

        return $this;
    }

    public function getAdresseMail(): ?string
    {
        return $this->adresse_mail;
    }

    public function setAdresseMail(string $adresse_mail): static
    {
        $this->adresse_mail = $adresse_mail;

        return $this;
    }

    public function getMdp(): ?string
    {
        return $this->mdp;
    }

    public function setMdp(string $mdp): static
    {
        $this->mdp = $mdp;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): static
    {
        $this->role = $role;

        return $this;
    }

    /**
     * @return Collection<int, Tache>
     */
    public function getTaches(): Collection
    {
        return $this->taches;
    }

    public function addTach(Tache $tach): static
    {
        if (!$this->taches->contains($tach)) {
            $this->taches->add($tach);
            $tach->setUtilisateur($this);
        }

        return $this;
    }

    public function removeTach(Tache $tach): static
    {
        if ($this->taches->removeElement($tach)) {
            // set the owning side to null (unless already changed)
            if ($tach->getUtilisateur() === $this) {
                $tach->setUtilisateur(null);
            }
        }

        return $this;
    }

    public function getTokenJwt(): ?string
    {
        return $this->token_jwt;
    }

    public function setTokenJwt(?string $token_jwt): static
    {
        $this->token_jwt = $token_jwt;

        return $this;
    }

    public function getDateEcheanceToken(): ?\DateTime
    {
        return $this->date_echeance_token;
    }

    public function setDateEcheanceToken(?\DateTime $date_echeance_token): static
    {
        $this->date_echeance_token = $date_echeance_token;

        return $this;
    }
}
