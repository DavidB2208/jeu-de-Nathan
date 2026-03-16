(function () {
  const app = document.getElementById('app');
  const audio = document.getElementById('bgm');

  const INITIAL_STATS = { survie: 8, respect: 2, haine: 0 };
  const INITIAL_STYLES = { frontal: 0, lucide: 0, cynique: 0, panique: 0 };

  const SPEAKERS = {
    trump: { name: 'Trump', label: 'États-Unis' },
    putin: { name: 'Poutine', label: 'Russie' },
    macron: { name: 'Macron', label: 'France' },
    netanyahu: { name: 'Netanyahou', label: 'Israël' },
    nathan: { name: 'Nathan', label: 'Réponse intérieure' },
    all: { name: 'Tous ensemble', label: 'Conclave' },
  };

  const q = (id, speaker, dossier, prompt, ambience, options, chapter) => ({ id, speaker, dossier, prompt, ambience, options, chapter });
  const o = (key, text, effects, styles, nathan, reaction) => ({ key, text, effects, styles, nathan, reaction });

  const QUESTIONS = [
    q(1, 'trump', 'DOSSIER 01 — LES TOURS ET L’APRÈS', 'Deux tours tombent, le monde change en une matinée, et les lois poussent plus vite que les fleurs. Tu racontes quoi ?', 'Le bouton rouge renvoie une lueur sale. Trump a l’air de flairer un marché plus qu’une vérité.', [
      o('A', 'Le choc a été réel, mais l’appareil a exploité chaque seconde avec l’avidité d’un casino qui prend feu et vend quand même des jetons.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« Version adulte : pas besoin de sorcier quand la cupidité a déjà un badge d’accès. »', 'Trump esquisse un sourire. « Enfin une phrase qui sent l’immobilier et le cynisme. »'),
      o('B', 'Des gens à l’intérieur ont laissé des angles morts, puis ont appelé ça de la surprise nationale.', { survie: 0, respect: 2, haine: 1 }, { frontal: 2, cynique: 1 }, '« J’appuie là où le costume devient inflammable. »', 'Poutine ne bouge pas. Mauvaise nouvelle : chez lui, l’immobilité est déjà une réaction.'),
      o('C', 'Le plus grand complot n’est pas l’attaque, c’est le parc sécuritaire construit dessus.', { survie: 1, respect: 2, haine: 0 }, { lucide: 3 }, '« J’offre la version premium de la vérité déprimante. »', 'Macron te regarde comme on évalue un couteau légalement ambigu.'),
      o('D', 'Le récit officiel tient globalement. Internet a surtout besoin d’un boss final permanent.', { survie: 1, respect: -2, haine: 0 }, { panique: 2, lucide: 1 }, '« J’insulte mes années d’insomnie pour acheter deux minutes de vie. Commerce honorable. »', 'Netanyahou plisse les yeux. Tu viens de perdre en intérêt dramatique.'),
    ], 'us'),
    q(2, 'trump', 'DOSSIER 02 — AREA 51 ET LES HANGARS', 'Le folklore américain adore les aliens, les hangars et les documents caviardés. Mythe utile ou rideau pratique ?', 'Un grésillement radio traverse la salle comme un moustique dans un cercueil.', [
      o('A', 'Les extraterrestres, j’y crois moins que les budgets noirs. Le décor est plus rentable que la créature.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 2 }, '« Je retire le martien, je garde le contrat. Tout devient plus crédible. »', 'Trump hoche la tête. « Le merchandising de la peur, ça je connais. »'),
      o('B', 'Il y a sûrement des programmes enterrés assez profonds pour qu’on préfère inventer des soucoupes plutôt que de les décrire.', { survie: 0, respect: 2, haine: 0 }, { frontal: 1, lucide: 1, cynique: 1 }, '« Dès qu’un État rougit, il appelle ça sécurité nationale. »', 'Poutine tapote sa bague. Clic. Clic. Clic.'),
      o('C', 'Le mythe alien sert surtout à absorber la curiosité sérieuse dans le ridicule pop-corn.', { survie: 1, respect: 2, haine: 0 }, { lucide: 3 }, '« Le meilleur camouflage, c’est parfois un public prêt à se moquer pour toi. »', 'Trump rit. « J’adore quand le peuple fait la déco lui-même. »'),
      o('D', 'Franchement, c’est surtout un musée de la parano avec beaucoup trop de t-shirts dérivés.', { survie: 1, respect: -1, haine: 0 }, { panique: 2 }, '« Je viens de gifler la moitié d’Internet avec une serviette humide. »', 'Le silence qui suit est long, et pas charitable.'),
    ], 'us'),
    q(3, 'trump', 'DOSSIER 03 — PHARMA, ÉCRANS ET TRAÇABILITÉ', 'Santé, plateformes, données, peur. L’empire moderne soigne, observe, ou dresse ?', 'Tu sens presque le néon vibrer dans tes molaires.', [
      o('A', 'Le contrôle moderne préfère la dépendance discrète : abonnement, collecte, friction douce, acceptation automatique.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 2 }, '« La laisse premium ne ressemble jamais à une laisse. C’est pour ça qu’elle marche. »', 'Macron esquisse un sourire trop bref pour être honnête.'),
      o('B', 'La crise est réelle, le bazar aussi, puis les industriels arrivent avec la grâce d’un vautour qui possède des actionnaires.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« Toujours magnifique de voir le chaos devenir un tableur. »', 'Trump approuve comme si tu venais de réciter un bilan trimestriel.'),
      o('C', 'Il n’y a pas de plan unique, juste une excellente compatibilité entre gens puissants et systèmes opportunistes.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« Le cauchemar adulte : personne ne pilote tout, et ça suffit largement. »', 'Même le bouton rouge semble écouter.'),
      o('D', 'On fantasme trop la cohérence des puissants. Ils profitent, oui. Ils orchestrent tout, non.', { survie: 1, respect: -1, haine: 0 }, { panique: 1, lucide: 1 }, '« Dire ça ici, c’est apporter une gourde à un concours de lance-flammes. »', 'Poutine te regarde avec le calme d’un homme qui n’a jamais eu besoin d’être sous-estimé.'),
    ], 'us'),

    q(4, 'putin', 'DOSSIER 04 — COSMODROME ET ARCHIVES BRÛLÉES', 'Le vieux prestige spatial russe : épopée pure ou vitrine héroïque pour programmes autrement plus laids ?', 'L’air semble devenir plus lourd quand Poutine parle.', [
      o('A', 'Le programme public servait aussi d’écran pour des usages que personne n’aurait applaudis à visage découvert.', { survie: 0, respect: 2, haine: 1 }, { frontal: 2, cynique: 1 }, '« L’espace, c’est pratique : ça met les secrets très loin des journalistes. »', 'Poutine laisse tomber un micro-rire sec. Personne n’a envie de fêter ça.'),
      o('B', 'Le mensonge est moins cosmique qu’administratif : rapports filtrés, récits héroïques, pièces manquantes et gloire retouchée.', { survie: 1, respect: 2, haine: 0 }, { lucide: 3 }, '« Rien n’égale la violence d’un mensonge tamponné par trois bureaux différents. »', 'Netanyahou incline légèrement la tête. Validation glacée.'),
      o('C', 'Les légendes monstrueuses servent surtout à détourner l’attention de magouilles plus banales et plus rentables.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 2 }, '« L’horreur moderne adore porter un costume de banalité. »', 'Trump tambourine du doigt, visiblement amusé.'),
      o('D', 'On a surtout un État qui adore le secret, pas forcément une mythologie derrière chaque boulon.', { survie: 1, respect: -1, haine: 0 }, { panique: 2, lucide: 1 }, '« J’arrose le feu. Je sais, ça se voit. »', 'Poutine ne répond pas. Le silence fait tout le travail.'),
    ], 'russia'),
    q(5, 'putin', 'DOSSIER 05 — LES OLIGARQUES ET LE THÉÂTRE DE FORCE', 'Le pouvoir russe, c’est un empire piloté par un seul homme ou un aquarium de requins qui ont signé une trêve très chère ?', 'Le bourdonnement de la clim ressemble à un générateur de mensonges bien entretenu.', [
      o('A', 'Un centre fort existe, mais il tient surtout parce que tout le monde a quelque chose à perdre en même temps.', { survie: 1, respect: 2, haine: 0 }, { lucide: 3 }, '« La loyauté des puissants est souvent une prise d’otage qui a appris la politesse. »', 'Poutine esquisse quelque chose entre l’ennui et l’accord.'),
      o('B', 'Le vrai système, c’est un pacte : fortunes protégées contre obéissance chorégraphiée.', { survie: 1, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« En langage propre : gouvernance. En langage sale : assurance mutuelle contre naufrage. »', 'Macron garde les mains jointes. Le geste d’un homme qui n’apprend rien mais note quand même.'),
      o('C', 'La mythologie du tsar unique est utile, mais les rouages dessous comptent autant que la silhouette.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« Le costume est important. Le mécanisme qui le repasse l’est davantage. »', 'Trump te fixe comme si tu venais d’expliquer une marque personnelle.'),
      o('D', 'On exagère le génie noir du système. Parfois, c’est juste de la peur, de l’inertie et une opposition mal nourrie.', { survie: 1, respect: -1, haine: 0 }, { panique: 2 }, '« Oui, j’ai choisi la phrase qui sent la sortie de secours. Je sais. »', 'Netanyahou soupire très doucement. C’est presque une insulte.'),
    ], 'russia'),
    q(6, 'putin', 'DOSSIER 06 — TROLLS, BROUILLARD ET FICTIONS', 'Les fermes à trolls, c’est la légende pratique de l’Occident ou une industrie politique parfaitement rentable ?', 'Le bouton rouge te semble soudain trop proche. Mauvais signe : il n’a pas bougé.', [
      o('A', 'Une industrie politique, évidemment. Quand on peut semer du brouillard pour presque rien, on le fait.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 2 }, '« Le mensonge à grande échelle, c’est le low-cost de la puissance. »', 'Poutine ne proteste pas. Ce détail parle très fort.'),
      o('B', 'Le fantasme grossit peut-être la machine, mais la machine existe assez pour mériter le mythe.', { survie: 1, respect: 2, haine: 0 }, { lucide: 3 }, '« Comme souvent : on exagère une saleté réelle jusqu’à la rendre décorative. »', 'Trump ricane. « Le spectacle adore ses exagérations. »'),
      o('C', 'Le vrai pouvoir n’est pas de convaincre tout le monde, juste d’user la notion même de vrai.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« Une vérité épuisée se défend moins bien qu’une vérité contredite. »', 'Même Macron approuve du bout des cils.'),
      o('D', 'Les gens n’ont pas besoin de trolls étrangers pour se ruiner le cerveau eux-mêmes.', { survie: 1, respect: 0, haine: 0 }, { cynique: 1, panique: 1 }, '« J’insulte toute l’espèce humaine. C’est reposant. »', 'La salle accepte ça avec un calme presque offensant.'),
    ], 'russia'),

    q(7, 'macron', 'DOSSIER 07 — LES GRANDS CORPS ET LA MACHINE', 'En France, le pouvoir vient des urnes, des cabinets, ou des mêmes vingt couloirs très bien chauffés ?', 'Macron croise les doigts avec une précision qui ressemble à un fichier Excel.', [
      o('A', 'Le cœur du système, c’est la reproduction élégante : écoles, cabinets, conseils et allers-retours feutrés.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 2 }, '« La noblesse moderne a remplacé l’épée par LinkedIn et des notes de synthèse. »', 'Macron sourit légèrement. « Enfin quelqu’un qui sait lire sans mythologie. »'),
      o('B', 'Les élus comptent, mais la machine adore recycler les mêmes cerveaux déjà homologués.', { survie: 1, respect: 2, haine: 0 }, { lucide: 3 }, '« La République est parfois un manège où les chevaux changent moins que les affiches. »', 'Poutine a l’air presque amusé. Presque.'),
      o('C', 'Le vrai complot français, c’est qu’il n’est même pas secret : il est juste rédigé dans une langue que personne ne lit jusqu’au bout.', { survie: 2, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« Tu peux tout cacher en pleine lumière si ton PDF fait 212 pages. »', 'Trump éclate d’un rire bref. « Ça, c’est du génie administratif. »'),
      o('D', 'On surestime la cohérence parisienne. Parfois c’est juste du chaos en costume repassé.', { survie: 1, respect: -1, haine: 0 }, { panique: 1, cynique: 1 }, '« Oui, j’ai choisi la version moins sexy et plus probable. Ce bunker n’apprécie pas toujours. »', 'Macron lisse sa manche. Le geste dit : continue, mais tu m’ennuies.'),
    ], 'france'),
    q(8, 'macron', 'DOSSIER 08 — SMART CITY ET POLITESSE NUMÉRIQUE', 'La technocratie promet du confort. À partir de quand le confort devient-il une cage chic ?', 'Quelque chose se verrouille sous la table. Tu décides héroïquement de ne pas regarder.', [
      o('A', 'Quand le citoyen devient une suite de permissions conditionnelles emballées dans l’efficacité.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 2 }, '« La belle prison commence toujours par une appli bien notée. »', 'Macron te fixe comme si tu venais d’abîmer un concept-note.'),
      o('B', 'Le danger n’est pas un plan unique, c’est l’alignement paresseux entre État, marché et flemme collective.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« La dystopie ne débarque pas. Elle s’installe avec un comité pilote. »', 'Même le bouton rouge paraît approuver sobrement.'),
      o('C', 'Le contrôle moderne récompense d’abord, profile ensuite, et punit si tu fais l’effort d’être visible.', { survie: 1, respect: 2, haine: 1 }, { frontal: 1, lucide: 1, cynique: 1 }, '« Le fouet numérique préfère les notifications push. »', 'Netanyahou hausse un sourcil. Tu détestes quand il fait ça.'),
      o('D', 'On fantasme trop le total. L’informatique publique est souvent trop bancale pour devenir un Léviathan propre.', { survie: 1, respect: -2, haine: 0 }, { panique: 2 }, '« Rien de plus triste qu’une dystopie qui bugge au login. »', 'Trump rit franchement. Personne d’autre.'),
    ], 'france'),
    q(9, 'macron', 'DOSSIER 09 — NUCLÉAIRE ET PIÈCES FERMÉES', 'En France, l’atome, c’est souveraineté, opacité ou religion d’ingénieur sous perfusion d’État ?', 'L’éclairage blafard rend tout le monde légèrement plus coupable qu’il ne l’était une minute plus tôt.', [
      o('A', 'C’est une religion technocratique : compétente, fière, parfois trop habituée à décider sans public.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« Le secret adore les gens persuadés d’être sincèrement indispensables. »', 'Macron encaisse ça avec un demi-sourire de rectorat.'),
      o('B', 'Le vrai problème n’est pas l’atome, c’est la distance entre ceux qui savent, ceux qui décident et ceux qui paient.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« Quand la chaîne de décision ressemble à une cathédrale, le peuple finit souvent dehors sous la pluie. »', 'Poutine approuve à peine. Tu prends.'),
      o('C', 'Le mythe spectaculaire détourne l’attention de l’opacité banale : contrats, arbitrages, réseaux et ego.', { survie: 1, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« Le vrai combustible du pouvoir, c’est souvent le vocabulaire. »', 'Trump a l’air de s’ennuyer, donc tu es probablement sur une zone sérieuse.'),
      o('D', 'Franchement, c’est surtout un sujet trop technique pour les fantasmes grand public.', { survie: 1, respect: -1, haine: 0 }, { panique: 1 }, '« La phrase rationnelle. La phrase qui fait perdre des points de spectacle. »', 'La salle te laisse survivre à cette banalité. Pour l’instant.'),
    ], 'france'),

    q(10, 'netanyahu', 'DOSSIER 10 — CYBERFORTERESSE ET OREILLES NUMÉRIQUES', 'Israël est souvent peint comme un État-laboratoire : haute sécurité, haute technologie, haute discrétion. Tu lis ça comment ?', 'Netanyahou a l’air de connaître déjà la moitié de ta réponse avant toi.', [
      o('A', 'Comme une forteresse moderne : surveillance performante, innovation utile, angle mort moral très variable selon qui regarde.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« Le futur adore sortir d’un labo avant d’entrer dans un tribunal. »', 'Netanyahou reste impassible. Le genre d’impassibilité qui signe des budgets.'),
      o('B', 'Le mythe grossit parfois la machine, mais la machine existe assez pour alimenter le mythe sans effort.', { survie: 1, respect: 2, haine: 0 }, { lucide: 3 }, '« Comme souvent : la rumeur prospère mieux quand le réel fait déjà 70 % du travail. »', 'Macron détourne très légèrement le regard. Sujet vivant.'),
      o('C', 'Le vrai pouvoir n’est pas d’entendre tout le monde, c’est de savoir quoi faire de ce qu’on entend avant les autres.', { survie: 2, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« Une oreille sans traitement, c’est juste du bruit. Les empires aiment les pipelines. »', 'Trump se redresse un peu. Ça l’amuse, ou ça l’inquiète.'),
      o('D', 'On surestime le côté monolithique. Même les États très durs restent pleins de frictions, de chapelles et d’erreurs.', { survie: 1, respect: -1, haine: 0 }, { panique: 2 }, '« J’offre de la nuance. Ce bunker préfère parfois les angles aux courbes. »', 'Netanyahou te regarde sans sourire. C’est sa version du reçu de lecture.'),
    ], 'israel'),
    q(11, 'netanyahu', 'DOSSIER 11 — MÉMOIRE, HISTOIRE ET INFRASTRUCTURE NARRATIVE', 'Quand l’histoire, la sécurité et l’identité se croisent, on obtient de la mémoire… ou un arsenal narratif ?', 'L’air devient sec, presque minéral. Comme si les murs avaient lu trop d’archives.', [
      o('A', 'Les États aiment tous muscler leur mémoire. Certains le font avec plus d’urgence, plus de couches, plus d’enjeux existentiels.', { survie: 1, respect: 2, haine: 0 }, { lucide: 3 }, '« Le passé est rarement mort. Il est souvent sous contrat. »', 'Netanyahou répond avec un silence droit comme une colonne.'),
      o('B', 'Le récit historique devient une infrastructure de sécurité dès qu’un pays sent qu’il doit justifier sa propre permanence.', { survie: 2, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« L’Histoire, chez les États nerveux, sert parfois d’abri anti-aérien moral. »', 'Poutine paraît apprécier l’architecture de la phrase.'),
      o('C', 'Le plus inquiétant, ce n’est pas l’usage politique du passé. C’est sa sophistication logistique.', { survie: 1, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« Une mémoire bien gérée peut nourrir plus de décisions qu’une vérité mal rangée. »', 'Trump a décroché, donc tu es probablement dans quelque chose de réel.'),
      o('D', 'Tous les pays bricolent leur roman national. Rien d’exceptionnel ici, juste plus de projecteurs.', { survie: 1, respect: -1, haine: 0 }, { panique: 2 }, '« La phrase qui essaie de ne vexer personne. Ce qui, ici, est déjà suspect. »', 'Macron te regarde comme un correcteur déçu mais poli.'),
    ], 'israel'),
    q(12, 'netanyahu', 'DOSSIER 12 — BUNKERS ET DIPLOMATIE', 'La vraie diplomatie se fait en sommet public, en ligne sécurisée, ou dans des pièces qui sentent le métal et l’assurance de soi ?', 'Énorme surprise : cette pièce semble persuadée d’être la bonne réponse.', [
      o('A', 'Le public reçoit le théâtre. Les décisions sérieuses préfèrent toujours une pièce où personne ne peut tweeter son indignation en direct.', { survie: 2, respect: 2, haine: 0 }, { lucide: 2, cynique: 2 }, '« La transparence est souvent une vitrine. Le magasin est derrière, sans fenêtres. »', 'Netanyahou t’observe comme si tu venais de réciter le règlement intérieur.'),
      o('B', 'Le bunker ne remplace pas la politique, il révèle juste à quel point elle adore le huis clos quand elle a vraiment peur.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« La vérité la plus sale du pouvoir : plus l’enjeu grimpe, moins il aime l’air libre. »', 'Poutine approuve d’un demi-millimètre. Dans ce bunker, c’est une accolade.'),
      o('C', 'Les pièces sans fenêtre servent aussi à transformer des désaccords immenses en compromis maquillés ensuite en sagesse.', { survie: 1, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« L’histoire adore appeler “raison d’État” des gens très nerveux qui bricolent jusqu’à l’aube. »', 'Trump a l’air de trouver ça presque romantique. Mauvais goût impeccable.'),
      o('D', 'On fantasme trop les bunkers. Beaucoup de décisions moches se prennent aussi en visioconférence moche.', { survie: 1, respect: 0, haine: 0 }, { panique: 1, cynique: 1 }, '« Oui, j’ai choisi la ligne la moins sexy. Je suis un artiste incompris. »', 'La salle t’accorde une respiration, pas une victoire.'),
    ], 'israel'),

    q(13, 'all', 'DOSSIER 13 — LES GUERRES COMME ÉCONOMIE NERVEUSE', 'Les conflits modernes servent d’abord des intérêts nationaux, des narratifs intérieurs, ou une économie mondiale qui adore les urgences ?', 'Les quatre visages te regardent comme si tu étais à la fois témoin et test d’étalonnage.', [
      o('A', 'Les guerres sont idéologiques en façade, logistiques au milieu et comptables à la fin.', { survie: 2, respect: 3, haine: 0 }, { lucide: 2, cynique: 2 }, '« La morale fait l’affiche. Le tableur fait la tournée. »', 'Le silence qui suit est si propre qu’il en devient insultant.'),
      o('B', 'Le vrai carburant, c’est l’urgence. Dès qu’un système adore l’urgence, il devient dépendant de ce qu’elle autorise.', { survie: 2, respect: 3, haine: 0 }, { lucide: 3 }, '« Certains régimes ont besoin d’un ennemi comme d’autres ont besoin d’un café : pour tenir jusqu’au soir. »', 'Même le bouton rouge paraît te laisser finir.'),
      o('C', 'Le pire, c’est qu’il n’y a peut-être pas de centre unique. Juste des acteurs différents qui deviennent compatibles dès que le désastre devient rentable.', { survie: 3, respect: 3, haine: 0 }, { lucide: 2, cynique: 2 }, '« Le cauchemar adulte : personne ne commande tout, et pourtant tout s’aligne assez bien pour broyer. »', 'Trump retire lentement sa main de la table. Détail excellent, donc terrifiant.'),
      o('D', 'Je retire presque tout. Plus j’écoute les puissants, plus j’ai l’impression que la vérité finale, c’est la friction entre ego géants.', { survie: 1, respect: 1, haine: 0 }, { panique: 2, lucide: 1 }, '« Oui, j’ai rebasculé vers “je veux rentrer vivant”. Grande tradition de fin de partie. »', 'Personne ne t’humilie pour ça. Ce qui est une forme de tension nouvelle.'),
    ], 'conclave'),
    q(14, 'all', 'DOSSIER 14 — LA PHRASE DE TROP', 'Une dernière. Ta plus grosse. Celle que tu n’écris plus en ligne parce qu’elle t’effraie toi aussi.', 'Tu comprends enfin la vraie règle : ici, une phrase n’est pas une opinion. C’est un test de calibrage.', [
      o('A', 'Vous ne contrôlez pas tout. Vous entretenez surtout un brouillard assez dense pour que le public ne distingue plus l’erreur, le crime, le marché et la doctrine.', { survie: 3, respect: 3, haine: 0 }, { lucide: 3 }, '« Le monde n’est pas une horloge. C’est une fuite d’huile entretenue avec méthode. »', 'Macron ferme les yeux une seconde. Mauvais ou excellent signe.'),
      o('B', 'Vos drapeaux diffèrent, mais vos élites se comprennent trop bien pour que le chaos reste jamais vraiment orphelin.', { survie: 2, respect: 3, haine: 0 }, { lucide: 2, cynique: 2 }, '« Pas besoin d’une table secrète si les mêmes réflexes fréquentent déjà les mêmes salons. »', 'Netanyahou appuie sa joue sur son poing. Il t’écoute vraiment. Problème.'),
      o('C', 'Vous êtes prisonniers de vos propres récits. Plus vous les vendez, plus vous devez gouverner comme s’ils étaient vrais.', { survie: 3, respect: 2, haine: 0 }, { lucide: 3 }, '« Le sommet du pouvoir : des adultes brillants coincés dans leurs personnages. »', 'Poutine regarde le bouton rouge puis toi. Tu détestes l’ordre de priorité.'),
      o('D', 'Je retire tout. Je veux juste sortir vivant, avec mon nom, mes dents et la possibilité obscène d’un petit-déj demain matin.', { survie: 2, respect: 1, haine: 0 }, { panique: 3 }, '« Vérité absolue : mes organes internes me tiennent encore à cœur. »', 'Trump rit nerveusement. « Enfin une déclaration sincère. »'),
    ], 'conclave'),
  ];

  const BONUS = {
    us: {
      frontal: q('us-f', 'trump', 'BONUS US — AUDIENCE CAPTIVE', 'Dans une démocratie-spectacle, le public choisit-il encore quelque chose, ou seulement le décor émotionnel ?', 'Le néon grésille comme un mauvais sondage.', [
        o('A', 'Le public choisit, mais dans une vitrine émotionnelle déjà scénographiée.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« La liberté existe. Elle adore juste les rails chromés. »', 'Trump tape du doigt. « Joli. Tu respectes le business model. »'),
        o('B', 'On lui vend l’illusion du choix comme une boisson XL pour cinquante centimes de plus.', { survie: 1, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« Le citoyen premium est parfois juste un client bien dressé. »', 'Même Macron a l’air de trouver l’image un peu trop propre pour être fausse.'),
      ], 'us'),
      lucide: q('us-l', 'trump', 'BONUS US — BUDGETS NOIRS', 'Le plus gros secret américain est-il militaire, financier, ou narratif ?', 'Trump a soudain l’air très réveillé.', [
        o('A', 'Narratif. Contrôler le récit coûte souvent moins cher que fabriquer le réel.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« Pourquoi construire un dragon si une bonne histoire suffit à vendre le lance-flammes ? »', 'Poutine cesse de tapoter sa bague. Il t’écoute vraiment.'),
        o('B', 'Financier. Rien ne voyage mieux qu’une ligne budgétaire mal lue.', { survie: 1, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« Les empires cachent souvent mieux derrière Excel que derrière une montagne. »', 'Trump approuve trop vite. Très mauvais signe.'),
      ], 'us'),
      cynique: q('us-c', 'trump', 'BONUS US — WALL STREET DU CHAOS', 'Quand l’urgence devient rentable, qui gouverne vraiment : l’élu, le marché, ou l’interface entre les deux ?', 'La question a l’air de sourire avant même la salle.', [
        o('A', 'L’interface, évidemment : là où les crises deviennent produits.', { survie: 2, respect: 2, haine: 0 }, { cynique: 3 }, '« Les gouvernements passent. Les pipelines de profit restent. »', 'Trump a l’air presque fier d’être d’accord.'),
        o('B', 'L’élu garde la scène, l’interface garde le moteur.', { survie: 2, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« Le volant est visible. La boîte noire beaucoup moins. »', 'La salle accepte cette formule avec une froideur professionnelle.'),
      ], 'us'),
      panique: q('us-p', 'trump', 'BONUS US — SORTIE DE SECOURS', 'Tu veux une réponse qui te garde entier. Laquelle ?', 'Nathan sent ses organes voter pour une prudence relative.', [
        o('A', 'Le vrai scandale est souvent administratif, pas cosmique.', { survie: 2, respect: 1, haine: 0 }, { panique: 2, lucide: 1 }, '« Je choisis la phrase qui saigne le moins. »', 'Trump roule des yeux. Tu prends quand même.'),
        o('B', 'Le système abuse surtout de la peur, pas forcément d’une omniscience parfaite.', { survie: 2, respect: 1, haine: 0 }, { panique: 2 }, '« Version “je veux encore pouvoir mâcher demain”. »', 'Personne n’applaudit. Personne ne tire non plus.'),
      ], 'us'),
    },
    russia: {
      frontal: q('ru-f', 'putin', 'BONUS RUSSIE — DÉFI AU MARBRE', 'Le pouvoir central est-il plus fort par conviction, par peur, ou par absence d’alternative potable ?', 'La salle devient minérale.', [
        o('A', 'Par peur d’abord, puis par habitude, ce qui est encore plus solide.', { survie: 1, respect: 2, haine: 1 }, { frontal: 2, lucide: 1 }, '« Les régimes durs vieillissent comme le béton : mal, mais lentement. »', 'Poutine accepte la formule sans sourire.'),
        o('B', 'Par absence d’alternative crédible à l’instant critique.', { survie: 1, respect: 2, haine: 0 }, { lucide: 2 }, '« L’option de secours compte parfois plus que le trône. »', 'Macron note mentalement. Tu le vois presque.'),
      ], 'russia'),
      lucide: q('ru-l', 'putin', 'BONUS RUSSIE — ANATOMIE DE L’OPACITÉ', 'Qu’est-ce qui tient mieux un système opaque : la peur, la routine, ou le brouillard ?', 'Le bouton rouge a l’air très patient.', [
        o('A', 'La routine. La peur fatigue. La routine, elle, pointe à l’heure.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« Le vrai tyran adore les horaires bien tenus. »', 'Poutine fixe la table comme si elle venait de valider ta copie.'),
        o('B', 'Le brouillard, parce qu’il rend la peur moins coûteuse à entretenir.', { survie: 2, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« Une vérité fatiguée se rebelle moins bien qu’une vérité interdite. »', 'Trump semble vaguement impressionné. C’est presque gênant.'),
      ], 'russia'),
      cynique: q('ru-c', 'putin', 'BONUS RUSSIE — PACTE DES REQUINS', 'Dans un système d’élites nerveuses, qu’est-ce qui vaut le plus : la loyauté, l’argent, ou les dossiers ?', 'Tu sens une joie minuscule et mauvaise dans la salle.', [
        o('A', 'Les dossiers. L’argent change de poche. Les dossiers changent la colonne vertébrale.', { survie: 2, respect: 2, haine: 0 }, { cynique: 3 }, '« Le portefeuille nourrit. Le dossier obéit. »', 'Poutine a l’air de trouver ça presque scolaire. Pire qu’un compliment.'),
        o('B', 'La loyauté, si elle est soutenue par une peur parfaitement distribuée.', { survie: 1, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« La fidélité adore les clauses cachées. »', 'Netanyahou approuve à peine. Très mauvaise sensation.'),
      ], 'russia'),
      panique: q('ru-p', 'putin', 'BONUS RUSSIE — ÉVITEMENT BALISTIQUE', 'Tu dois minimiser le risque. Tu choisis ?', 'Même ton diaphragme veut une réponse prudente.', [
        o('A', 'Le système est dur, mais pas magique. Il tient aussi grâce aux faiblesses des autres.', { survie: 2, respect: 1, haine: 0 }, { panique: 2, lucide: 1 }, '« Version raisonnable, odeur de sortie incluse. »', 'Poutine ne te démonte pas. Victoire microscopique.'),
        o('B', 'L’opacité compte, mais la routine compte plus que le mythe.', { survie: 2, respect: 1, haine: 0 }, { panique: 2 }, '« Je choisis la phrase qui ne finit pas sur une civière. »', 'La salle te laisse respirer.'),
      ], 'russia'),
    },
    france: {
      frontal: q('fr-f', 'macron', 'BONUS FRANCE — CLAQUE AU VELOURS', 'La technocratie française est-elle brillante, fermée, ou simplement trop amoureuse d’elle-même ?', 'L’air sent le rapport de commission premium.', [
        o('A', 'Les trois, dans cet ordre selon le jour et l’éclairage.', { survie: 1, respect: 2, haine: 1 }, { frontal: 2, cynique: 1 }, '« Le narcissisme d’État existe. Il a même des concours. »', 'Macron garde un sourire administratif. Inquiétant.'),
        o('B', 'Brillante, donc parfois aveugle à ce qu’elle ne mesure pas elle-même.', { survie: 2, respect: 2, haine: 0 }, { lucide: 2 }, '« L’intelligence adore parfois son propre reflet. »', 'Trump a l’air de trouver ça très français, ce qui n’aide personne.'),
      ], 'france'),
      lucide: q('fr-l', 'macron', 'BONUS FRANCE — DISSÈQUEUR DE LA MACHINE', 'Le vrai cœur de la machine française : centralisation, continuité, ou habitude de décider sans bruit ?', 'Les néons prennent des airs de salle de concours.', [
        o('A', 'La continuité. Elle survit même aux gens qui prétendent l’incarner.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« Les présidents passent. Le style administratif reste coiffé. »', 'Macron laisse passer un silence d’école supérieure.'),
        o('B', 'La centralisation, parce qu’elle transforme la confiance en tuyauterie.', { survie: 2, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« Quand tout remonte au centre, le centre finit par se croire le monde. »', 'Poutine a l’air de respecter le câblage de la phrase.'),
      ], 'france'),
      cynique: q('fr-c', 'macron', 'BONUS FRANCE — COMMIS DE L’ENTRE-SOI', 'Le réseau vaut-il plus que la compétence, ou la compétence sert-elle juste de parfum au réseau ?', 'La salle dégage une odeur de portes capitonnées.', [
        o('A', 'Le réseau vaut plus, parce qu’il décide où la compétence est regardée.', { survie: 2, respect: 2, haine: 0 }, { cynique: 3 }, '« Le mérite adore arriver déjà recommandé. »', 'Macron prend ça sans broncher. C’est presque plus violent.'),
        o('B', 'La compétence compte, mais surtout quand elle parle déjà le dialecte du club.', { survie: 2, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« Même le talent aime les codes d’entrée. »', 'Netanyahou approuve d’un regard bref.'),
      ], 'france'),
      panique: q('fr-p', 'macron', 'BONUS FRANCE — NUANCE DE SURVIE', 'Tu dois répondre sans prendre un coup de règle sur les doigts. Tu choisis quoi ?', 'Nathan sent une envie très digne de ne pas finir comme exemple pédagogique.', [
        o('A', 'La machine française fonctionne surtout par inertie organisée.', { survie: 2, respect: 1, haine: 0 }, { panique: 2, lucide: 1 }, '« Phrase grise, mais vivable. »', 'Macron semble presque soulagé de ton manque d’héroïsme.'),
        o('B', 'Le vrai scandale est souvent plus administratif que maléfique.', { survie: 2, respect: 1, haine: 0 }, { panique: 2 }, '« Oui, j’ai choisi la voie de la survie molle. »', 'La salle accepte cette lâcheté fonctionnelle.'),
      ], 'france'),
    },
    israel: {
      frontal: q('il-f', 'netanyahu', 'BONUS ISRAËL — FRICTION DE FORTERESSE', 'Quand un État se pense forteresse, qu’est-ce qu’il protège le plus : sa population, sa posture, ou sa continuité ?', 'Tu regrettes déjà d’aimer les questions précises.', [
        o('A', 'Sa continuité d’abord, parce que tout le reste finit par se rebrancher dessus.', { survie: 1, respect: 2, haine: 1 }, { frontal: 2, lucide: 1 }, '« Les forteresses ont parfois plus peur du futur que de l’ennemi. »', 'Netanyahou ne sourit pas. Tu n’avais rien demandé.'),
        o('B', 'Sa posture publique, parce qu’elle conditionne ensuite les autres décisions.', { survie: 1, respect: 2, haine: 0 }, { frontal: 1, cynique: 1 }, '« Une image d’acier peut coûter très cher en chair. »', 'Poutine laisse tomber un regard bref. Très bref. »'),
      ], 'israel'),
      lucide: q('il-l', 'netanyahu', 'BONUS ISRAËL — ARCHIVISTE NERVEUX', 'Qu’est-ce qui tient le mieux un État-laboratoire : la tech, le renseignement, ou la narration de nécessité ?', 'La pièce a l’air d’avoir déjà répondu mais veut voir si toi aussi.', [
        o('A', 'La narration de nécessité, parce qu’elle rend la tech et le renseignement socialement portables.', { survie: 2, respect: 2, haine: 0 }, { lucide: 3 }, '« Les machines s’acceptent mieux quand le récit leur fait de la place. »', 'Netanyahou t’écoute comme on écoute une procédure bien rangée.'),
        o('B', 'Le renseignement, parce qu’il transforme la peur en anticipation opérable.', { survie: 2, respect: 2, haine: 0 }, { lucide: 2, cynique: 1 }, '« La peur brute est bruyante. L’anticipation, elle, facture. »', 'Trump te regarde avec une admiration qui n’aide personne.'),
      ], 'israel'),
      cynique: q('il-c', 'netanyahu', 'BONUS ISRAËL — INGÉNIERIE DE LA VIGILANCE', 'La sécurité maximale, c’est une doctrine, un marché, ou un style de gouvernement ?', 'L’ambiance sent le métal propre.', [
        o('A', 'Les trois. C’est ce qui la rend si exportable.', { survie: 2, respect: 2, haine: 0 }, { cynique: 3 }, '« Le futur se vend mieux quand il dit qu’il protège. »', 'Netanyahou accepte ça sans broncher.'),
        o('B', 'Un marché d’abord, puis une doctrine devenue habitude.', { survie: 2, respect: 2, haine: 0 }, { cynique: 2, lucide: 1 }, '« Beaucoup de principes modernes ont un devis quelque part. »', 'Macron détourne les yeux. Il a compris trop vite.'),
      ], 'israel'),
      panique: q('il-p', 'netanyahu', 'BONUS ISRAËL — PAROLE SOUS DÉTECTEUR', 'Tu veux une réponse prudente. Laquelle passe le mieux ?', 'Nathan choisit activement de rester un mammifère fonctionnel.', [
        o('A', 'La sécurité très haute produit forcément des angles morts moraux et logistiques, comme partout.', { survie: 2, respect: 1, haine: 0 }, { panique: 2, lucide: 1 }, '« Phrase acceptable, pas glorieuse, mais je tiens à mes dents. »', 'Netanyahou te lit puis te laisse continuer. Cadeau immense.'),
        o('B', 'On surestime toujours la cohérence des machines puissantes.', { survie: 2, respect: 1, haine: 0 }, { panique: 2 }, '« Je choisis la phrase qui n’explose pas au contact. »', 'La salle te tolère. Sensation médiocre, mais utile.'),
      ], 'israel'),
    },
  };

  const state = {
    phase: 'intro',
    index: 0,
    stats: { ...INITIAL_STATS },
    styles: { ...INITIAL_STYLES },
    timeLeft: 20,
    currentQuestionList: QUESTIONS.slice(),
    lastChoice: null,
    unlocked: [],
    chapterDone: new Set(),
    musicOn: false,
    debug: false,
  };

  function dominantStyle(styles) {
    return Object.entries(styles).sort((a, b) => b[1] - a[1])[0][0];
  }

  function resolveRoute(styles, stats) {
    const top = dominantStyle(styles);
    if (top === 'frontal' && stats.haine >= 4) return { title: 'Route cachée — Pyromane rhétorique', summary: 'Nathan force les portes avec ses phrases et confond parfois courage et accélérant.', bonus: 'Tu cognes avant de mesurer la porte. Parfois elle cède. Parfois c’est ta mâchoire.' };
    if (top === 'lucide' && stats.respect >= 7) return { title: 'Route cachée — Analyste du brouillard', summary: 'Nathan délaisse le folklore pour viser les structures, les routines et la logistique du pouvoir.', bonus: 'Tu n’as pas cherché un monstre parfait. Tu as décrit l’écosystème qui le nourrit.' };
    if (top === 'cynique' && stats.respect >= 6) return { title: 'Route cachée — Procureur sale', summary: 'Nathan lit le monde comme un réseau d’intérêts croisés, de couvertures mutuelles et de profits nerveux.', bonus: 'Tu as troqué la mythologie contre la comptabilité du désastre.' };
    if (top === 'panique') return { title: 'Route cachée — Survivant nerveux', summary: 'Nathan veut vivre plus qu’il ne veut gagner le débat. Et il a peut-être raison.', bonus: 'Tu n’as pas gagné la vérité. Tu as négocié avec la mort.' };
    return { title: 'Route cachée — Zone grise', summary: 'Nathan flotte entre lucidité, théâtre, cynisme et instinct animal.', bonus: 'Ni pur, ni stable, ni cohérent. Donc probablement humain.' };
  }

  function computeEnding(stats) {
    if (stats.survie <= 2) return { tone: 'fatal', title: 'Fin — Exécuté sur place', text: `Poutine fait un geste minuscule.\nQuelqu’un sort de l’ombre.\nTu n’entends même pas le coup partir.\nSeulement la chaise qui racle, puis le noir.\n\n« Un silencieux. Un corps qui tombe. Rideau. »` };
    if (stats.survie >= 3 && stats.survie <= 5 && stats.haine >= 7) return { tone: 'cold', title: 'Fin — Disparu', text: `On ne te tue pas dans la pièce.\nLes gens sérieux aiment les couloirs pour ça.\nLa porte s’ouvre, tu marches, puis plus rien de vérifiable.\n\nNathan n’est jamais ressorti de ce bâtiment.` };
    if (stats.survie >= 3 && stats.survie <= 5 && stats.respect >= 6 && stats.haine <= 4) return { tone: 'threat', title: 'Fin — Viré avec menace à vie', text: `Macron referme le dossier. Trump désigne la porte.\nPoutine parle enfin : « Dehors. Et si tu racontes cette soirée, on transformera ta vie en démonstration. »\n\nTu sors vivant. Dans ce bunker, c’est déjà un privilège.` };
    if (stats.survie >= 7 && stats.respect >= 7 && stats.haine <= 3) return { tone: 'best', title: 'Fin — Ils te laissent partir', text: `Personne ne sourit vraiment. Puis quelqu’un dit enfin : « Tu peux partir. »\nLa porte s’ouvre.\nDehors, l’air a le goût obscène d’une liberté provisoire.\n\nTu es vivant. Pour l’instant.` };
    if (stats.survie >= 6 && stats.respect <= 4 && stats.haine >= 6) return { tone: 'violent', title: 'Fin — Tabassé, jeté dehors, tracé', text: `Le premier coup part avant la fin du silence.\nLe monde devient métal, chaussures, goût de fer.\nQuand tu rouvres les yeux, tu es dehors.\nTon téléphone affiche déjà un message : « La prochaine fois on ne te ratera pas. »` };
    return { tone: 'gray', title: 'Fin — Sortie grise', text: `Personne ne te félicite. Personne ne t’abat.\nLa porte s’ouvre.\nTu sors vivant. Libre, c’est beaucoup trop généreux comme mot.\n\nTu as quitté la salle. Pas son système nerveux.` };
  }

  function buildReport(stats, styles, route) {
    const top = dominantStyle(styles);
    const map = {
      frontal: 'Tu attaques avant de sécuriser la sortie.',
      lucide: 'Tu préfères les structures au folklore.',
      cynique: 'Tu lis le pouvoir comme une industrie de la couverture mutuelle.',
      panique: 'Tu veux vivre plus que convaincre.',
    };
    return {
      title: 'Rapport psychologique de Nathan',
      cards: [
        { title: 'Profil dominant', value: route.title, text: route.summary },
        { title: 'Lecture clinique', value: top.toUpperCase(), text: map[top] },
        { title: 'Indicateurs', value: `Survie ${stats.survie}/10 · Respect ${stats.respect}/10 · Haine ${stats.haine}/10`, text: route.bonus },
      ],
    };
  }

  function add(a, b) {
    return {
      frontal: a.frontal + (b.frontal || 0),
      lucide: a.lucide + (b.lucide || 0),
      cynique: a.cynique + (b.cynique || 0),
      panique: a.panique + (b.panique || 0),
    };
  }

  function clamp(v) { return Math.max(0, Math.min(10, v)); }

  function maybeInsertBonus(currentQuestion) {
    const nextQuestion = state.currentQuestionList[state.index + 1];
    if (!nextQuestion || currentQuestion.chapter !== nextQuestion.chapter) {
      const chapter = currentQuestion.chapter;
      if (!state.chapterDone.has(chapter) && BONUS[chapter]) {
        const style = dominantStyle(state.styles);
        const bonus = BONUS[chapter][style] || BONUS[chapter].lucide;
        state.currentQuestionList.splice(state.index + 1, 0, bonus);
        state.chapterDone.add(chapter);
        state.unlocked.push(bonus.dossier);
      }
    }
  }

  function startMusic() {
    if (!state.musicOn) return;
    audio.volume = 0.35;
    audio.play().catch(() => {});
  }

  function toggleMusic() {
    state.musicOn = !state.musicOn;
    if (state.musicOn) startMusic(); else audio.pause();
    render();
  }

  function resetForNewRun() {
    state.phase = 'question';
    state.index = 0;
    state.stats = { ...INITIAL_STATS };
    state.styles = { ...INITIAL_STYLES };
    state.timeLeft = 20;
    state.currentQuestionList = QUESTIONS.slice();
    state.lastChoice = null;
    state.unlocked = [];
    state.chapterDone = new Set();
  }

  function choose(option) {
    const q = state.currentQuestionList[state.index];
    state.stats = {
      survie: clamp(state.stats.survie + option.effects.survie),
      respect: clamp(state.stats.respect + option.effects.respect),
      haine: clamp(state.stats.haine + option.effects.haine),
    };
    state.styles = add(state.styles, option.styles);
    state.timeLeft = Math.max(0, state.timeLeft - 1);
    state.lastChoice = { ...option, dossier: q.dossier };
    maybeInsertBonus(q);
    state.phase = 'reaction';
    render();
  }

  function next() {
    if (state.index >= state.currentQuestionList.length - 1) {
      state.phase = 'ending';
    } else {
      state.index += 1;
      state.phase = 'question';
    }
    render();
  }

  function buildLightLayer(activeSpeaker, phase) {
    if (phase === 'reaction' || phase === 'intro' || phase === 'ending') return '';
    const speakers = activeSpeaker === 'all' ? ['trump', 'putin', 'macron', 'netanyahu'] : [activeSpeaker];
    return `<div class="light-layer">${speakers.map(id => `<div class="spot ${id}"></div>`).join('')}</div>`;
  }

  function buildTopHud() {
    let dossier = 'INTRODUCTION';
    let currentSpeaker = 'Préambule';
    if (state.phase === 'question') {
      const q = state.currentQuestionList[state.index];
      dossier = q.dossier;
      currentSpeaker = SPEAKERS[q.speaker].name;
    } else if (state.phase === 'reaction') {
      dossier = 'RÉPONSE DE NATHAN';
      currentSpeaker = 'Nathan';
    } else if (state.phase === 'ending') {
      dossier = 'RAPPORT FINAL';
      currentSpeaker = 'Conclave';
    }

    return `
      <div class="topbar">
        <div class="badge-card">
          <div class="smallcaps">${dossier}</div>
          <div class="subline">
            <div class="pill"><strong>${currentSpeaker}</strong></div>
            <div class="pill">Question <strong>${Math.min(state.index + 1, state.currentQuestionList.length)}</strong> / <strong>${state.currentQuestionList.length}</strong></div>
          </div>
        </div>
        <div class="hud-right">
          <div class="pill">Temps ressenti <strong>${String(state.timeLeft).padStart(2, '0')}:00</strong></div>
          ${state.debug ? `
            <div class="pill">Survie <strong>${state.stats.survie}</strong></div>
            <div class="pill">Respect <strong>${state.stats.respect}</strong></div>
            <div class="pill">Haine <strong>${state.stats.haine}</strong></div>
            <div class="pill">Frontal <strong>${state.styles.frontal}</strong></div>
            <div class="pill">Lucide <strong>${state.styles.lucide}</strong></div>
            <div class="pill">Cynique <strong>${state.styles.cynique}</strong></div>
            <div class="pill">Panique <strong>${state.styles.panique}</strong></div>
          ` : ''}
        </div>
      </div>`;
  }

  function buildIntro() {
    return `
      <div class="intro-panel fade-in">
        <div class="intro-grid">
          <div class="intro-main">
            <div class="smallcaps">Nathan et les Quatre Maîtres — édition bunker</div>
            <h1>Tu es Nathan.</h1>
            <p>Tu as passé des années à collectionner des captures, des dossiers compressés, des notes vocales supprimées à l’aube et des fils parano qui sentaient déjà la sueur froide.</p>
            <p>Aujourd’hui, tu n’es plus derrière un écran. Tu es assis face à quatre dirigeants autour d’une table noire, avec un gros bouton rouge au milieu. Objectif officiel : parler. Objectif réel : ressortir vivant.</p>
            <p>Le jeu affiche les questions en bas de l’écran. Quand un dirigeant parle, le fond des dirigeants apparaît. Quand Nathan répond, le fond bascule sur Nathan. Selon tes choix, tu traces des sous-chemins et déverrouilles des dossiers bonus.</p>
            <div class="tag-list">
              <span class="pill">14 dossiers principaux</span>
              <span class="pill">bonus secrets</span>
              <span class="pill">routes cachées</span>
              <span class="pill">musique intégrée</span>
              <span class="pill">Alt/⌘ + D : debug</span>
            </div>
          </div>
          <div class="intro-side">
            <div class="smallcaps">Ce qui t’attend</div>
            <p>Le bunker aime les réponses trop extrêmes presque autant qu’il aime les corriger. Les phrases les plus spectaculaires ne sont pas toujours les plus intelligentes. Les plus prudentes ne sont pas toujours les plus vivantes.</p>
            <p>Nathan a du sarcasme, de la sueur, un instinct de survie très variable et une relation douteuse avec l’idée de “juste une dernière théorie”.</p>
            <button id="startBtn" class="start-btn" type="button">Commencer la partie</button>
          </div>
        </div>
      </div>`;
  }

  function buildQuestion() {
    const q = state.currentQuestionList[state.index];
    const choicesClass = q.options.length > 4 ? 'choices two' : 'choices';
    return `
      <div class="bottom-shell fade-in">
        <div class="panel compact">
          <div class="header-row">
            <div class="speaker-chip">${SPEAKERS[q.speaker].label}</div>
            <div class="ambience">${q.ambience}</div>
          </div>
          <div class="question-box"><p id="typedPrompt" class="type-caret"></p></div>
          <div class="${choicesClass}">
            ${q.options.map((option, i) => `
              <button class="choice" type="button" data-choice="${i}">
                <div class="choice-row">
                  <div class="choice-key">${option.key}</div>
                  <div class="choice-text">${option.text}</div>
                </div>
              </button>`).join('')}
          </div>
        </div>
      </div>`;
  }

  function buildReaction() {
    const route = resolveRoute(state.styles, state.stats);
    return `
      <div class="reaction-panel fade-in">
        <div class="panel">
          <div class="reaction-cards">
            <div class="card">
              <div class="card-title">Ce que Nathan vient de dire</div>
              <p>${state.lastChoice.text}</p>
            </div>
            <div class="card accent">
              <div class="card-title">Pensée intérieure de Nathan</div>
              <p>${state.lastChoice.nathan}</p>
            </div>
            <div class="card">
              <div class="card-title">Réaction dans la salle</div>
              <p>${state.lastChoice.reaction}</p>
            </div>
          </div>
          <div class="route-panel">
            <div class="card-title">Sous-chemin actif</div>
            <div class="route-title">${route.title}</div>
            <p>${route.summary}</p>
          </div>
          <button id="nextBtn" class="start-btn" type="button">${state.index >= state.currentQuestionList.length - 1 ? 'Voir la fin' : 'Question suivante'}</button>
        </div>
      </div>`;
  }

  function buildEnding() {
    const ending = computeEnding(state.stats);
    const route = resolveRoute(state.styles, state.stats);
    const report = buildReport(state.stats, state.styles, route);
    return `
      <div class="ending-grid fade-in">
        <div class="ending-panel ${ending.tone}">
          <div class="smallcaps">Fin de partie</div>
          <h2 style="margin:10px 0 0;font-size:38px;">${ending.title}</h2>
          <div class="end-box">${ending.text.split('\n').map(line => `<p>${line}</p>`).join('')}</div>
          <div class="end-box">
            <div class="card-title">Route cachée révélée</div>
            <div class="route-title">${route.title}</div>
            <p>${route.summary}</p>
            <p><em>${route.bonus}</em></p>
          </div>
        </div>
        <div class="report-panel">
          <div class="smallcaps">Analyse post-entretien</div>
          <h2 style="margin:10px 0 0;font-size:32px;">${report.title}</h2>
          <div class="report-cards">
            ${report.cards.map(card => `<div class="card"><div class="card-title">${card.title}</div><div class="route-title" style="font-size:22px;">${card.value}</div><p>${card.text}</p></div>`).join('')}
            <div class="card"><div class="card-title">Sous-chemins débloqués</div><p>${state.unlocked.length ? state.unlocked.join(' · ') : 'Aucun bonus débloqué cette fois.'}</p></div>
          </div>
          <div class="stats-row">
            <div class="pill">Survie <strong>${state.stats.survie}</strong></div>
            <div class="pill">Respect <strong>${state.stats.respect}</strong></div>
            <div class="pill">Haine <strong>${state.stats.haine}</strong></div>
            <div class="pill">Frontal <strong>${state.styles.frontal}</strong></div>
            <div class="pill">Lucide <strong>${state.styles.lucide}</strong></div>
            <div class="pill">Cynique <strong>${state.styles.cynique}</strong></div>
            <div class="pill">Panique <strong>${state.styles.panique}</strong></div>
          </div>
          <div class="end-actions">
            <button id="restartBtn" class="start-btn" type="button">Rejouer</button>
            <button id="resetBtn" class="secondary-btn" type="button">Retour à l’intro</button>
          </div>
        </div>
      </div>`;
  }

  function render() {
    const activeSpeaker = state.phase === 'question'
      ? state.currentQuestionList[state.index].speaker
      : state.phase === 'reaction'
        ? 'nathan'
        : 'all';

    app.innerHTML = `
      <div class="stage-bg ${activeSpeaker === 'nathan' ? 'nathan' : 'leaders'}"><img src="assets/${activeSpeaker === 'nathan' ? 'nathan.png' : 'leaders.png'}" alt="background"></div>
      <div class="fx-overlay"></div>
      ${buildLightLayer(activeSpeaker, state.phase)}
      <div class="music-floating"><button id="musicBtn" class="music-btn" type="button">Musique ${state.musicOn ? 'ON' : 'OFF'}</button></div>
      ${buildTopHud()}
      <div class="main-wrap">
        ${state.phase === 'intro' ? buildIntro() : ''}
        ${state.phase === 'question' ? buildQuestion() : ''}
        ${state.phase === 'reaction' ? buildReaction() : ''}
        ${state.phase === 'ending' ? buildEnding() : ''}
      </div>`;

    bind();
    if (state.phase === 'question') typePrompt(state.currentQuestionList[state.index].prompt);
  }

  function bind() {
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) musicBtn.addEventListener('click', toggleMusic);

    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.addEventListener('click', function () {
      resetForNewRun();
      if (!state.musicOn) {
        state.musicOn = true;
      }
      startMusic();
      render();
    });

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.addEventListener('click', next);

    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) restartBtn.addEventListener('click', function () {
      resetForNewRun();
      render();
    });

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', function () {
      state.phase = 'intro';
      render();
    });

    document.querySelectorAll('[data-choice]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const idx = Number(this.getAttribute('data-choice'));
        const q = state.currentQuestionList[state.index];
        choose(q.options[idx]);
      });
    });
  }

  let typeTimer = null;
  function typePrompt(text) {
    const target = document.getElementById('typedPrompt');
    if (!target) return;
    clearInterval(typeTimer);
    let i = 0;
    target.textContent = '';
    target.classList.add('type-caret');
    typeTimer = setInterval(() => {
      i += 2;
      target.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(typeTimer);
        target.classList.remove('type-caret');
      }
    }, 16);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.altKey || e.metaKey) && e.key.toLowerCase() === 'd') {
      state.debug = !state.debug;
      render();
    }
  });

  render();
})();
