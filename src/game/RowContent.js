export const size = 9;

export class BoardFields {
  constructor(ctx, G, moves) {
    this.ctx = ctx;
    this.G = G;
    this.moves = moves;
  }
  fields = [
    // bottom right
    {
      type: 'go',
      name: 'GO',
      phases: {
        start: {
          description: 'Kezdoallapot. Segelyen vagy. Hány gyermeket vállalsz?',
          choices: [
            {
              txt: 'Egyet sem',
              fn: () => {
                this.moves.setPlayerState('work', 'segely');
                this.moves.setPlayerState('children', '0');
                this.moves.setPlayerState('lakasrezsi', 'fizetetlen');
                this.moves.setPlayerState('lakasbiztositas', 'fizetetlen');
                this.moves.setPhase('end');
              },
            },
            {
              txt: 'Egyet',
              fn: () => {
                this.moves.setPlayerState('work', 'segely');
                this.moves.setPlayerState('children', '1');
                this.moves.setPlayerState('lakasrezsi', 'fizetetlen');
                this.moves.setPlayerState('lakasbiztositas', 'fizetetlen');
                this.moves.setPhase('end');
              },
            },
            {
              txt: 'Kettőt',
              fn: () => {
                this.moves.setPlayerState('work', 'segely');
                this.moves.setPlayerState('children', '2');
                this.moves.setPlayerState('lakasrezsi', 'fizetetlen');
                this.moves.setPlayerState('lakasbiztositas', 'fizetetlen');
                this.moves.setPhase('end');
              },
            },
            {
              txt: 'Hármat',
              fn: () => {
                this.moves.setPlayerState('work', 'segely');
                this.moves.setPlayerState('children', '3');
                this.moves.setPlayerState('lakasrezsi', 'fizetetlen');
                this.moves.setPlayerState('lakasbiztositas', 'fizetetlen');
                this.moves.setPhase('end');
              },
            },
          ],
        },
        end: {
          description: 'Dobj a kockával!',
          dice: 'true',
        },
      },
    },
    // bottom
    {
      type: 'work',
      color: 'light-blue',
      name: 'Hétfő - Felvettek közmunkára',
      phases: {
        start: {
          description:
            'Segély helyett hetente munkabért kap: (14.000 Ft/16.500 Ft/ 21.000 Ft/21.000 Ft).',
          action: () => {
            console.log('Executing Hetfo action');
            this.moves.setPlayerState('work', 'kozmunka');
            this.moves.setPhase('end');
          },
          choices: [],
        },
        end: {
          description: 'Dobj a kockával!',
          dice: 'true',
        },
      },
    },
    {
      type: 'work',
      color: 'light-blue',
      name: 'Kedd - Építkezésen dolgozhatsz',
      //fixme: nincs benne, hogy gyerekes kozmunkas nem vallalhatja
      phases: {
        start: {
          description:
            '(Gyerekes közmunkás nem vállalhatja) „Feketén”: 30.000 Ft, legálisan: 15.000 Ft. Aki feketén dolgozik, annak fizetéskor dobnia kell: - ha 1-est dob: vissza kell fizetnie a segélyt (23.000 Ft-ot)',
          action: () => {
            console.log('Executing Kedd action');
            if (
              this.G.player[this.ctx.currentPlayer].state['work'] ==
                'kozmunka' &&
              parseInt(
                this.G.player[this.ctx.currentPlayer].state['children']
              ) > 0
            ) {
              this.moves.setPhase('cannot-work');
              console.log('cannot work');
            } else {
              this.moves.setPhase('can-work');
              console.log('can work');
            }
          },
          choices: [],
        },
        'cannot-work': {
          description: 'Gyerekes közmunkás nem vállalhat alkalmi munkát!',
          choices: [
            {
              txt: 'Tovább',
              fn: () => {
                console.log('nem vallal munkat');
                this.moves.setPhase('end');
              },
            },
          ],
        },
        'can-work': {
          description: 'Vállalsz munkát?',
          choices: [
            {
              txt: 'Nem Vállalom',
              fn: () => {
                console.log('nem vallal munkat');
                this.moves.setPhase('end');
              },
            },
            {
              txt: 'Legálisan',
              fn: () => {
                console.log('legalisat valasztotta');
                this.moves.setPlayerState('work', 'legalismunka');
                this.moves.setPhase('end');
              },
            },
            {
              txt: 'Illegálisan',
              fn: () => {
                console.log('illegalisat valasztotta');
                this.moves.setPlayerState('work', 'illegalismunka');
                this.moves.setPhase('end');
              },
            },
          ],
        },
        end: {
          description: 'Dobj a kockával!',
          dice: 'true',
        },
      },
    },
    {
      type: 'spending',
      name: 'Szerda - Tápszert kell venni',
      drawing: 'question',
      phases: {
        start: {
          description:
            'Az édesanya teje elapadt a rossz életkörül- mények miatt. A tápszer ára egy hónapra: 11.000 Ft. (KÖTELEZŐ)',
          action: () => {
            if (
              parseInt(
                this.G.player[this.ctx.currentPlayer].state['children']
              ) > 0
            ) {
              this.moves.addMoney(-11000);
            }
            this.moves.setPhase('end');
          },
          choices: [],
        },
        end: {
          description: 'Dobj a kockával!',
          dice: 'true',
        },
      },
    },
    {
      type: 'spending',
      name: 'Csütörtök - Megbüntetett a rendőr',
      phases: {
        start: {
          description:
            'A büntetés összege (csekk): 10.000 Ft. A csekket, legkésőbb a hó végéig ki kell fizetni. Ha nem sikerül, a büntetés megduplázódik. Ha lefizeted a rendőrt 5.000 Ft-tal, nem ad csekket.',
          action: () => {
            console.log('csutortok');
          },
          choices: [
            {
              txt: 'Lefizetem a rendőrt!',
              fn: () => {
                this.moves.addMoney(-5000);
                this.moves.setPlayerState('rendorcsekk', 0);
                this.moves.setPhase('end');
              },
            },
            {
              txt: 'Kérem a csekket',
              fn: () => {
                this.moves.setPlayerState('rendorcsekk', 1);
                this.moves.setPhase('end');
              },
            },
          ],
        },
        end: {
          description: 'Dobj a kockával!',
          dice: 'true',
        },
      },
    },
    {
      type: 'chance',
      name: 'Péntek - szerencsejáték',
      //TODO: Le kell fejleszteni a szerncsekereket
      phases: {
        start: {
          description:
            'A nyereményt kockadobás határozza meg: 1-2-es: vesztettél / 3-4-es: visszanyerted apénzed / 5-6-os: megdupláztad a tétet.',
          action: () => {
            console.log('pentek');
            this.moves.setPhase('end');
          },
          chances: [
            {
              txt: 'Vesztettél! (1-2)',
              probability: 0.33,
              fn: (stake) => {
                this.moves.addMoney(-1 * stake);
                this.moves.setPhase('end');
              },
            },
            {
              txt: 'Visszanyerted a tétet (3-4)',
              probability: 0.33,
              fn: (stake) => {
                this.moves.addMoney(0);
                this.moves.setPhase('end');
              },
            },
            {
              txt: 'Megdupláztad a tétet (5-6)',
              probability: 0.33,
              fn: (stake) => {
                this.moves.addMoney(stake);
                this.moves.setPhase('end');
              },
            },
          ],
        },
        end: {
          description: 'Dobj a kockával!',
          dice: 'true',
        },
      },
    },
    {
      type: 'income',
      name: 'Hétvége - Postás és Bolt',
      //TODO: le kell fejleszteni a tobbfazisu mezot
      //ha feketen dolgoztal, akkor kockadobas,h. megkapod-e a fizut
      //csekkfizetes. ha rendorcsekked van, akkor ha nem fizeted, akkor duplazodik
      //bevasarlas:valasztas, h. egy osszegben, vagy kisboltban vasarolsz.
      phases: {
        start: {
          description:
            'A postás pénzt hoz: - közmunkás heti bér: (14.000 Ft/16.500 Ft/ 21.000 Ft/21.000 Ft). - aki nem közmunkás, segélyt kap: (23.000 Ft)',
          action: () => {
            console.log('hetvege');
            this.moves.setPhase('end');
          },
          choices: [],
        },
        end: {
          description: 'Dobj a kockával!',
          dice: 'true',
        },
      },
    },
    //TODO: lefejleszteni,h. a hetvege akcioit mindenkeppen vegre kell hajtani, akkor is, ha nem lepsz ra, csak adhaladsz rajta.
    {
      type: 'property',
      color: 'dark-purple',
      name: 'Baltic Avenue',
      price: '50',
    },
    {
      type: 'community-chest',
      name: 'Community Chest',
      drawing: 'cube',
      instructions: 'Follow instructions on top card',
    },
    {
      type: 'property',
      color: 'dark-purple',
      name: 'Mediter-ranean Avenue',
      price: '50',
    },
    // bottom left
    { type: 'jail', name: 'Jail' },
    // left
    {
      type: 'property',
      color: 'orange',
      name: 'New York Avenue',
      price: 200,
    },
    {
      type: 'property',
      color: 'orange',
      name: 'Tennessee Avenue',
      price: 180,
    },
    {
      type: 'community-chest',
      name: 'Community Chest',
      drawing: 'cube',
      instructions: 'Follow instructions on top card',
    },
    {
      type: 'property',
      color: 'orange',
      name: 'St. James Avenue',
      price: 180,
    },
    {
      type: 'railroad',
      name: 'Pennsylvania Railroad',
      drawing: 'subway',
      price: '200',
    },
    {
      type: 'property',
      color: 'purple',
      name: 'Virginia Avenue',
      price: 160,
    },
    {
      type: 'property',
      color: 'purple',
      name: 'States  Avenue',
      price: 140,
    },
    {
      type: 'utility electric-company',
      name: 'Electric Company',
      drawing: 'lightbulb-o',
      price: '150',
    },
    {
      type: 'property',
      color: 'purple',
      name: 'St. Charles Place',
      price: 140,
    },
    // top left
    { type: 'free-parking', name: 'Free Parking' },
    // top
    {
      type: 'property',
      color: 'red',
      name: 'Kentucky Avenue',
      price: 220,
    },
    {
      type: 'chance',
      name: 'Chance',
      drawing: 'question',
    },
    {
      type: 'property',
      color: 'red',
      name: 'Indiana Avenue',
      price: 220,
    },
    {
      type: 'property',
      color: 'red',
      name: 'Illinois Avenue',
      price: 200,
    },
    {
      type: 'railroad',
      name: 'B & O Railroad',
      drawing: 'subway',
      price: '200',
    },
    {
      type: 'property',
      color: 'yellow',
      name: 'Atlantic Avenue',
      price: 260,
    },
    {
      type: 'property',
      color: 'yellow',
      name: 'Ventnor Avenue',
      price: 260,
    },
    {
      type: 'utility waterworks',
      name: 'Waterworks',
      drawing: 'tint',
      price: '120',
    },
    {
      type: 'property',
      color: 'yellow',
      name: 'Marvin Gardens',
      price: 280,
    },
    // top right
    { type: 'go-to-jail', name: 'Go To Jail' },
    // right
    {
      type: 'property',
      color: 'green',
      name: 'Pacific Avenue',
      price: 300,
    },
    {
      type: 'property',
      color: 'green',
      name: 'North Carolina Avenue',
      price: 300,
    },
    {
      type: 'community-chest',
      name: 'Community Chest',
      drawing: 'cube',
      instructions: 'Follow instructions on top card',
    },
    {
      type: 'property',
      color: 'green',
      name: 'Pennsylvania Avenue',
      price: 320,
    },
    {
      type: 'railroad',
      name: 'Short Line',
      drawing: 'subway',
      price: '200',
    },
    {
      type: 'chance',
      name: 'Chance',
      drawing: 'question',
    },
    {
      type: 'property',
      color: 'dark-blue',
      name: 'Park Place',
      price: 350,
    },
    {
      type: 'fee luxury-tax',
      name: 'Luxury Tax',
      instructions: 'Pay $75.00',
      drawing: 'diamond',
    },
    {
      type: 'property',
      color: 'dark-blue',
      name: 'Boardwalk',
      price: 400,
    },
  ];
}
