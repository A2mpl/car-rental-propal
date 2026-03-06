export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
  content: string;
}

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&auto=format&fit=crop&q=80`;

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'louer-ferrari-bordeaux',
    title: 'Louer une Ferrari à Bordeaux : guide complet 2025',
    description:
      'Tout ce que vous devez savoir pour louer une Ferrari à Bordeaux : prix, conditions, assurance et meilleures routes de Gironde.',
    date: '2025-11-10',
    category: 'Guide',
    readTime: 7,
    image: u('1592198084033-aade902d1aae'),
    content: `
      <h2>Louer une Ferrari à Bordeaux : le rêve accessible</h2>
      <p>Bordeaux, avec ses routes sinueuses de Gironde et ses vignobles pittoresques, offre un cadre idéal pour profiter d'une <strong>Ferrari à la location</strong>. Que vous rêviez d'une Ferrari Roma, d'une 488 GTB ou d'une SF90 Stradale, plusieurs options s'offrent à vous dans la région bordelaise.</p>

      <h2>Quel budget prévoir pour louer une Ferrari ?</h2>
      <p>Le <strong>prix de location d'une Ferrari à Bordeaux</strong> varie selon le modèle et la durée :</p>
      <ul>
        <li><strong>Ferrari Roma</strong> : à partir de 780€/jour</li>
        <li><strong>Ferrari 488 GTB</strong> : à partir de 850€/jour</li>
        <li><strong>Ferrari SF90 Stradale</strong> : à partir de 1 580€/jour</li>
      </ul>
      <p>Les tarifs weekend (vendredi–lundi) sont souvent plus avantageux, avec des remises allant jusqu'à 20% par rapport au tarif journée multiplié par trois.</p>

      <h2>Conditions requises pour louer une Ferrari</h2>
      <p>Pour accéder à la location d'une Ferrari à Bordeaux, vous devrez généralement :</p>
      <ul>
        <li>Être âgé d'au moins 25 ans</li>
        <li>Détenir un permis de conduire valide depuis plus de 3 ans</li>
        <li>Fournir une carte de crédit avec provision suffisante pour la caution</li>
        <li>Présenter un justificatif de domicile récent</li>
      </ul>

      <h2>Les meilleures routes pour profiter de votre Ferrari en Gironde</h2>
      <p>Une fois au volant de votre Ferrari à Bordeaux, voici quelques itinéraires incontournables :</p>
      <ul>
        <li><strong>Route des Châteaux</strong> : traversée de Saint-Émilion à Pauillac sur la D2</li>
        <li><strong>Côte d'Argent</strong> : Arcachon via la D650, avec vue sur le Bassin</li>
        <li><strong>Dordogne</strong> : les routes de Bergerac et ses virages techniques</li>
      </ul>

      <h2>Assurance et assistance incluses</h2>
      <p>Chaque Ferrari proposée à la location inclut une <strong>assurance tous risques</strong> et une assistance 24h/24. La franchise peut varier entre 3 000€ et 10 000€ selon le modèle — pensez à vérifier la possibilité de la réduire moyennant un supplément journalier.</p>

      <h2>Réserver votre Ferrari à Bordeaux</h2>
      <p>Pour garantir la disponibilité, réservez votre Ferrari au moins 2 semaines à l'avance pour un weekend, et 4 semaines pour une occasion spéciale (mariage, anniversaire). Contactez notre équipe pour une disponibilité immédiate et un devis personnalisé.</p>
    `,
  },
  {
    slug: 'voitures-electriques-location-2025',
    title: 'Les meilleures voitures électriques à louer en 2025',
    description:
      'Tesla Model S, Audi e-tron GT, Porsche Taycan : comparatif des meilleures voitures électriques disponibles à la location en 2025.',
    date: '2025-10-22',
    category: 'Comparatif',
    readTime: 8,
    image: u('1560958089-b8a1929cea89'),
    content: `
      <h2>Électrique rime désormais avec performance</h2>
      <p>En 2025, la <strong>location de voitures électriques premium</strong> connaît une croissance exponentielle. Les conducteurs découvrent que zéro émission n'est pas synonyme de compromis sur les sensations de conduite. Bien au contraire.</p>

      <h2>Tesla Model S Plaid : le roi de l'accélération</h2>
      <p>La <strong>Tesla Model S Plaid</strong> reste la référence absolue en termes de performance électrique. Avec ses 1 020 chevaux et ses 1,9 secondes pour le 0-100 km/h, elle dépasse la plupart des supercars thermiques. Son autonomie de 652 km (WLTP) garantit une tranquillité d'esprit totale.</p>
      <p><strong>Prix de location</strong> : à partir de 280€/jour à Bordeaux.</p>

      <h2>Porsche Taycan Turbo S : le sportscar électrique</h2>
      <p>La <strong>Porsche Taycan Turbo S</strong> incarne la philosophie Porsche dans l'ère électrique : légèreté apparente, agilité remarquable et sonorité artificielle mais grisante. Ses 750 chevaux se développent en 2,8 secondes seulement.</p>
      <p><strong>Prix de location</strong> : à partir de 420€/jour.</p>

      <h2>Audi RS e-tron GT : l'élégance germanique</h2>
      <p>Cousin de la Porsche Taycan partageant la même plateforme J1, l'<strong>Audi RS e-tron GT</strong> offre une personnalité distincte : plus GT, plus raffinée, idéale pour les longs trajets. Ses 646 chevaux lui permettent le 0-100 en 3,3 secondes.</p>
      <p><strong>Prix de location</strong> : à partir de 320€/jour.</p>

      <h2>Recharger à Bordeaux : tout est prévu</h2>
      <p>Bordeaux dispose d'un réseau de bornes de recharge dense. Les superchargeurs Tesla se trouvent au Lac (Bordeaux Nord), à Mérignac et à Pessac. Pour les autres véhicules, le réseau Ionity couvre les principaux axes.</p>

      <h2>Quel électrique choisir pour votre location ?</h2>
      <ul>
        <li><strong>Performance pure</strong> → Tesla Model S Plaid</li>
        <li><strong>Conduite sportive</strong> → Porsche Taycan Turbo S</li>
        <li><strong>Confort GT</strong> → Audi RS e-tron GT ou Mercedes EQS 580</li>
      </ul>
    `,
  },
  {
    slug: 'location-voiture-luxe-mariage-bordeaux',
    title: 'Voiture de luxe pour mariage à Bordeaux : le guide ultime',
    description:
      'Comment choisir la voiture parfaite pour votre mariage à Bordeaux ? Bentley, Ferrari, Rolls-Royce — conseils et tarifs pour un jour inoubliable.',
    date: '2025-09-15',
    category: 'Événement',
    readTime: 6,
    image: u('1563720223523-59d3b3e7d1e5'),
    content: `
      <h2>La voiture de mariage idéale : entre tradition et modernité</h2>
      <p>Votre mariage mérite une <strong>voiture d'exception à Bordeaux</strong>. Entre le classicisme d'une Bentley Continental GT et l'audace d'une Ferrari Roma, les options ne manquent pas pour marquer les esprits de vos invités et immortaliser votre journée en photos.</p>

      <h2>Les modèles les plus demandés pour les mariages bordelais</h2>

      <h3>Bentley Continental GT Speed — l'élegance absolue</h3>
      <p>Avec ses courbes enveloppantes, son intérieur en cuir Mulliner et son moteur W12 de 659 chevaux, la <strong>Bentley Continental GT</strong> est le choix ultime pour les mariés qui veulent allier raffinement et puissance discrète. Disponible à partir de 1 100€/jour.</p>

      <h3>Ferrari Roma — romantique et sportive</h3>
      <p>La <strong>Ferrari Roma</strong> doit son nom à la douceur de vivre romaine. Son design néo-classique élégant, sa couleur rosso corsa ou grigio coburn, en font un choix parfait pour les cérémonies au Château Pichon Baron ou au Domaine de Murtoli.</p>

      <h3>Maserati MC20 — exclusivité absolue</h3>
      <p>Pour un mariage vraiment unique, la <strong>Maserati MC20</strong> offre une exclusivité incomparable. Très peu d'exemplaires en circulation, un design futuriste signé par le Centro Stile Maserati, et un V6 biturbo de 630 chevaux qui vous fera arriver en grands seigneurs.</p>

      <h2>Conseils pratiques pour votre voiture de mariage</h2>
      <ul>
        <li><strong>Réservez 3 à 6 mois à l'avance</strong> pour les dates de haute saison (mai–septembre)</li>
        <li><strong>Vérifiez la possibilité de décoration</strong> : fleurs sur le capot, rubans — certains loueurs l'autorisent</li>
        <li><strong>Prévoyez un chauffeur</strong> si la journée est longue — certaines sociétés proposent ce service</li>
        <li><strong>Souscrivez une assurance journée supplémentaire</strong> pour réduire la franchise</li>
      </ul>

      <h2>Lieux de mariage à Bordeaux qui méritent une voiture d'exception</h2>
      <ul>
        <li>Château Pichon Baron — Pauillac</li>
        <li>Domaine de la Butte Ronde — Saint-Émilion</li>
        <li>Villa Montesquieu — La Brède</li>
        <li>Château Haut-Brion — Pessac</li>
      </ul>
    `,
  },
  {
    slug: 'porsche-911-vs-audi-r8-sport',
    title: 'Porsche 911 GT3 vs Audi RS e-tron GT : quelle sportive choisir ?',
    description:
      "Duel entre deux icônes : la Porsche 911 GT3 thermique et l'Audi RS e-tron GT électrique. Lequel offre la meilleure expérience de conduite ?",
    date: '2025-08-30',
    category: 'Comparatif',
    readTime: 9,
    image: u('1503376780353-7e6692767b70'),
    content: `
      <h2>Le grand débat : thermique vs électrique pour la conduite sportive</h2>
      <p>La <strong>Porsche 911 GT3</strong> et l'<strong>Audi RS e-tron GT</strong> représentent deux visions radicalement différentes de la voiture de sport. L'une est ancrée dans 60 ans de tradition, l'autre dessine l'avenir. Laquelle conviendra le mieux à votre prochaine location ?</p>

      <h2>Porsche 911 GT3 : la pureté mécanique</h2>
      <p>La <strong>911 GT3</strong> dispose d'un flat-6 atmosphérique de 4,0 litres développant 510 chevaux. Sa boîte PDK ou manuelle à 6 rapports (une rareté en 2024), sa direction ultra-communicative et son aileron actif en font l'une des voitures de route les plus engagées jamais produites.</p>

      <p><strong>Points forts :</strong></p>
      <ul>
        <li>Sonorité incomparable à 9 000 tr/min</li>
        <li>Légèreté : 1 435 kg seulement</li>
        <li>Connexion conducteur-machine exceptionnelle</li>
        <li>Disponible en boîte manuelle</li>
      </ul>

      <p><strong>Prix de location</strong> : à partir de 650€/jour.</p>

      <h2>Audi RS e-tron GT : la technologie triomphante</h2>
      <p>L'<strong>Audi RS e-tron GT</strong> propose 646 chevaux en continu, disponibles instantanément. La transmission intégrale électrique offre une traction irréprochable dans tous les virages. Son autonomie de 480 km (WLTP) lève les angoisses.</p>

      <p><strong>Points forts :</strong></p>
      <ul>
        <li>Couple instantané brutal : 830 Nm</li>
        <li>Confort GT remarquable sur autoroute</li>
        <li>Technologie embarquée de pointe</li>
        <li>Aucune émission locale</li>
      </ul>

      <p><strong>Prix de location</strong> : à partir de 320€/jour.</p>

      <h2>Notre verdict</h2>
      <p>Pour la <strong>conduite sur route sinueuse et les sensations pures</strong>, la Porsche 911 GT3 reste insurpassable. Son flat-6 atmosphérique est une expérience musicale autant que mécanique.</p>
      <p>Pour un <strong>usage mixte route/ville, avec confort et technologie</strong>, l'Audi RS e-tron GT s'impose. Son rapport performances/facilité de conduite est imbattable.</p>

      <p>Les deux méritent d'être essayées. Pourquoi choisir ?</p>
    `,
  },
  {
    slug: 'location-longue-duree-premium',
    title: "Location longue durée de voiture premium : tout ce qu'il faut savoir",
    description:
      'Avantages de la location longue durée premium vs achat. Tarifs, conditions et véhicules disponibles à Bordeaux pour 1 semaine ou plus.',
    date: '2025-08-05',
    category: 'Guide',
    readTime: 7,
    image: u('1533473359331-0135ef1b58bf'),
    content: `
      <h2>La location longue durée premium : une alternative séduisante à l'achat</h2>
      <p>La <strong>location longue durée de voitures premium</strong> (LLD) connaît un essor remarquable en France. À Bordeaux et en Gironde, de plus en plus de professionnels et particuliers optent pour cette formule qui permet de rouler en BMW M5, Porsche Taycan ou Tesla Model S sans immobiliser un capital important.</p>

      <h2>Avantages de la location longue durée premium</h2>
      <ul>
        <li><strong>Pas d'apport initial</strong> : conservez votre trésorerie pour votre activité ou vos investissements</li>
        <li><strong>Charges fixes et prévisibles</strong> : loyer mensuel fixe, sans surprise</li>
        <li><strong>Renouvellement régulier</strong> : changez de véhicule tous les 2-4 ans</li>
        <li><strong>Entretien inclus</strong> : selon les formules, révisions et pneumatiques inclus</li>
        <li><strong>Avantages fiscaux</strong> : déductibilité partielle pour les professionnels</li>
      </ul>

      <h2>Tarifs indicatifs pour une semaine à Bordeaux</h2>
      <table>
        <tr><th>Véhicule</th><th>Tarif semaine</th><th>Tarif mois</th></tr>
        <tr><td>BMW M5 Competition</td><td>à partir de 1 680€</td><td>à partir de 5 400€</td></tr>
        <tr><td>Porsche Taycan Turbo S</td><td>à partir de 1 980€</td><td>à partir de 6 200€</td></tr>
        <tr><td>Tesla Model S Plaid</td><td>à partir de 1 480€</td><td>à partir de 4 800€</td></tr>
        <tr><td>Mercedes EQS 580</td><td>à partir de 1 340€</td><td>à partir de 4 200€</td></tr>
      </table>

      <h2>Qui peut louer une voiture premium longue durée ?</h2>
      <p>La location longue durée premium s'adresse à :</p>
      <ul>
        <li><strong>Les professionnels</strong> souhaitant une voiture de représentation</li>
        <li><strong>Les expatriés</strong> en mission temporaire à Bordeaux</li>
        <li><strong>Les particuliers</strong> préparant un road trip de plusieurs semaines</li>
        <li><strong>Les entreprises</strong> gérant une flotte véhicule</li>
      </ul>

      <h2>Documents nécessaires</h2>
      <ul>
        <li>Permis de conduire valide (minimum 3 ans)</li>
        <li>Pièce d'identité</li>
        <li>Justificatif de domicile</li>
        <li>Relevé d'information assurance (bonus-malus)</li>
        <li>Pour les professionnels : Kbis ou SIREN</li>
      </ul>
    `,
  },
  {
    slug: 'tesla-model-s-location-bordeaux',
    title: 'Tesla Model S à Bordeaux : 0 émission, 100% sensation',
    description:
      'Guide complet pour louer une Tesla Model S Plaid à Bordeaux. Recharge, autonomie, performances — tout savoir avant de réserver.',
    date: '2025-07-18',
    category: 'Véhicule',
    readTime: 6,
    image: u('1561580125-028ee3bd62eb'),
    content: `
      <h2>Tesla Model S Plaid : le summum de la berline électrique</h2>
      <p>La <strong>Tesla Model S Plaid à Bordeaux</strong> offre une expérience de conduite radicalement différente. Trois moteurs électriques, 1 020 chevaux, 0 à 100 km/h en 1,9 secondes : les chiffres donnent le vertige. Mais au-delà des performances brutes, c'est la praticité au quotidien qui séduira les conducteurs bordelais.</p>

      <h2>L'autonomie en pratique à Bordeaux</h2>
      <p>Avec <strong>652 km d'autonomie WLTP</strong>, la Tesla Model S Plaid permet de relier Bordeaux à Paris (590 km) sans recharge, ou de parcourir l'intégralité de la côte atlantique girondine plusieurs fois. En conduite normale, comptez 500 à 550 km d'autonomie réelle.</p>

      <h3>Où recharger à Bordeaux ?</h3>
      <ul>
        <li><strong>Superchargeur Tesla — Bordeaux Lac</strong> : 16 bornes V3 (250 kW) à l'Auchan du Lac</li>
        <li><strong>Superchargeur Mérignac</strong> : 8 bornes V3 près d'Ikea</li>
        <li><strong>Ionity Bordeaux</strong> : 6 bornes 350 kW sur le périphérique</li>
        <li><strong>Hôtels et parkings</strong> : de nombreux parkings du centre proposent la recharge AC</li>
      </ul>

      <h2>L'interface Tesla : une seconde nature</h2>
      <p>L'écran central de 17 pouces de la Model S Plaid intègre navigation, médias, système de climatisation et paramètres de conduite. La mise à jour OTA (Over The Air) améliore régulièrement les fonctionnalités. L'Autopilot est inclus et facilite les longs trajets sur autoroute.</p>

      <h2>Sensations de conduite</h2>
      <p>Le mode Plaid déclenche une accélération qui défie la physique. La poussée est brutale, linéaire et sans fin. Les 1 020 chevaux se manifestent avec une discrétion totale depuis l'habitacle — seule la sensation d'être collé au siège trahit la violence de la poussée.</p>

      <h2>Réserver votre Tesla Model S à Bordeaux</h2>
      <p>Disponible dès <strong>280€/jour</strong>, notre Tesla Model S Plaid est l'une des locations les plus demandées. Réservez rapidement — la disponibilité est limitée, surtout les weekends et en haute saison.</p>
    `,
  },
  {
    slug: 'circuit-voiture-sport-louer',
    title: "Louer une voiture sport pour faire du circuit : ce qu'il faut savoir",
    description:
      'Comment louer une voiture sport pour des sorties circuit en France ? Conditions, assurances spécifiques et circuits near Bordeaux.',
    date: '2025-06-25',
    category: 'Circuit',
    readTime: 8,
    image: u('1519245659620-e859806a8d3b'),
    content: `
      <h2>Location voiture sport pour circuit : une niche exigeante</h2>
      <p>Piloter une voiture de sport sur circuit est l'expérience de conduite ultime. Mais louer une voiture premium pour une <strong>sortie circuit</strong> est différent de la location routière classique — et beaucoup plus encadré.</p>

      <h2>La grande majorité des loueurs n'autorisent pas le circuit</h2>
      <p>C'est le point essentiel à savoir : la <strong>grande majorité des sociétés de location</strong> interdisent formellement l'utilisation de leurs véhicules sur circuit, piste ou zone de haute vitesse. Les contrats comportent une clause explicite en ce sens.</p>
      <p>Pourquoi ? L'usure est bien plus importante, les risques d'accident multipliés, et les assurances standard ne couvrent pas ces utilisations.</p>

      <h2>Les solutions pour rouler sur circuit</h2>

      <h3>1. Louer directement au circuit</h3>
      <p>Des circuits comme le <strong>Circuit de Mérignac</strong> (Bordeaux) ou le <strong>Château de Lastours</strong> proposent leurs propres véhicules à la location, spécialement préparés et assurés pour l'usage circuit.</p>

      <h3>2. Les stages de pilotage</h3>
      <p>Les stages de pilotage (<strong>RSO, JPS Motor, GT Évènement</strong>) incluent véhicule, instructeur et assurance. Une formule complète pour découvrir les sensations circuit en toute sécurité.</p>

      <h3>3. Les locations exotiques spécialisées</h3>
      <p>Certaines sociétés spécialisées proposent des véhicules <em>pista</em> (Lamborghini Huracán Performante Laps, Ferrari 488 Challenge) dédiés à l'usage circuit, avec une assurance adaptée. Ces prestations sont nettement plus onéreuses : comptez 2 000 à 5 000€ la journée.</p>

      <h2>Circuits proches de Bordeaux</h2>
      <ul>
        <li><strong>Circuit de Mérignac</strong> — 10 minutes de Bordeaux centre, 1,6 km</li>
        <li><strong>Circuit de Château de Lastours</strong> — Mazamet (2h), 4,8 km, magnifique cadre naturel</li>
        <li><strong>Circuit Paul Ricard</strong> — Le Castellet (4h), circuit de F1</li>
        <li><strong>Circuit de Jerez</strong> — Espagne (3h30 depuis Bordeaux)</li>
      </ul>

      <h2>Notre recommandation</h2>
      <p>Pour une expérience route exceptionnelle <em>sans restrictions</em>, nos véhicules comme la <strong>Porsche 911 GT3</strong>, la <strong>Lamborghini Huracán EVO</strong> ou la <strong>McLaren 720S</strong> sont disponibles à la location pour une utilisation 100% routière. La Gironde offre des routes suffisamment engagées pour assouvir votre passion.</p>
    `,
  },
  {
    slug: 'bmw-m4-competition-guide',
    title: 'BMW M4 Competition : la berline sport la plus demandée à Bordeaux',
    description:
      'Guide complet sur la BMW M4 Competition — performances, équipements, prix de location à Bordeaux. La sportive allemande la plus populaire de 2025.',
    date: '2025-05-12',
    category: 'Véhicule',
    readTime: 7,
    image: u('1555215695-3004980ad54e'),
    content: `
      <h2>BMW M4 Competition : l'équilibre parfait entre utilité et performance</h2>
      <p>La <strong>BMW M4 Competition</strong> s'est imposée comme la référence absolue de la berline sport accessible. Ni trop extrême comme la 911 GT3, ni trop sage comme une BMW série 4 standard, elle occupe une position unique sur le marché et dans nos coeurs de passionnés.</p>

      <h2>Motorisation et performances</h2>
      <p>Le <strong>6 cylindres en ligne biturbo de 3,0 litres S58</strong> développe 510 chevaux dans la version Competition xDrive (propulsion ou transmission intégrale disponible). Le 0-100 km/h s'effectue en 3,5 secondes pour la version xDrive.</p>
      <p>Ce moteur est unanimement salué par la presse spécialisée : puissance généreuse, couple abondant dès 2 650 tr/min, sonorité artificielle mais satisfaisante via les haut-parleurs.</p>

      <h2>Le châssis : l'âme de la M4</h2>
      <p>La direction électro-hydraulique de la M4 Competition transmet des informations précieuses. Les amortisseurs adaptatifs M permettent de passer du confort ferme (mode Comfort) à la tenue circuit (mode Track). Les freins carbone-céramique optionnels (M Carbon Ceramic Brakes) sont indestructibles.</p>

      <h2>À l'intérieur : entre sport et luxe</h2>
      <p>Les sièges baquets M en cuir Merino embrassent parfaitement le conducteur. L'écran incurvé de 12,3 + 14,9 pouces du système BMW iDrive 8 domine le tableau de bord. Le volant M en daim à fond plat invite à piloter. Les quatre places réelles en font une voiture utilisable au quotidien.</p>

      <h2>BMW M4 vs BMW M5 : laquelle choisir pour votre location ?</h2>
      <ul>
        <li><strong>M4 Competition</strong> : plus légère, plus agile, idéale pour les routes sinueuses et les sensations pures</li>
        <li><strong>M5 Competition</strong> : plus puissante (727 ch), plus confortable, parfaite pour les longs trajets rapides</li>
      </ul>

      <h2>Location BMW M à Bordeaux</h2>
      <p>Notre flotte inclut plusieurs modèles M, dont la <strong>BMW M5 Competition</strong> disponible à partir de 380€/jour. La BMW M4 Competition peut également être disponible sur demande — contactez-nous pour connaître les disponibilités.</p>

      <h2>Les routes parfaites pour une BMW M en Gironde</h2>
      <ul>
        <li><strong>D10 Médoc</strong> : longues lignes droites et virages rapides entre Bordeaux et Pauillac</li>
        <li><strong>D1 Arcachon</strong> : forêt des Landes, revêtement parfait</li>
        <li><strong>D936 Dordogne</strong> : épingles et lacets sur les coteaux de Saint-Émilion</li>
      </ul>
    `,
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
