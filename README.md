## Objectif

Automatiser l'envoi de mail personalisés à une liste de contacts

## Utilisation

Renseigner dans `config.json`:

- la liste de contacts qui doit être atteinte
- le sujet du mail
- l'adresse email du bot
- son token

Le reste du fichier n'a pas besoin d'être modifié

Mettre dans `assets`

- Le mail en version texte (`mail.txt` par défaut)
- Le mail en version html (`mail.html` par défaut)
- Les pieces jointes (dans `assets/attachments` par défaut)

Exécuter

```bash
npm install & npm run send-mails
```

ou

```bash
yarn & yarn send-mails
```

## Customisation de mails

Il est possible d'injecter des données au moment de l'envoie du mail, sous format texte ou html grace à la syntaxe `${}`.
Un objet `data` est exposé qui représente le contact ciblé.

### Exemple d'injection de donnée

```html
<section>
  <h3>Ce mail est adressé à ${data.name}</h3>
  <p>Dont l'adresse email est ${data.email}</p>
</section>
```

> [!WARN]
> Be sure all the data you want to inject are defined for every contact to avoid seeing `undefined` in the custom mails
