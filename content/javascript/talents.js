var filter_talents = function() {
    var tier = $('#select-tier').val();
    var tag = $('#select-tag').val();
    var filter_talents;

    if (tier != 'All') {
        filtered_talents = talent_list.filter(function(element, index) {
            return element.Tier == tier;
        });
    } else {
        filtered_talents = JSON.parse(JSON.stringify(talent_list));
    };

    if (tag != 'All') {
        filtered_talents = filtered_talents.filter(function(element, index) {
            return element.Tags.includes(tag);
        });
    }

    filtered_talents.sort(function(a,b) {
        var nameA = a.Name.toUpperCase();
        var nameB = b.Name.toUpperCase();
        var tierA = a.Tier;
        var tierB = b.Tier;

        if (tierA < tierB) return -1;
        if (tierA > tierB) return 1;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    $('#talents').empty();
    filtered_talents.forEach(function(element) {
        $('#talents').append("<h6>" + element.Name + "</h6><div class='talent-stat'><p><strong>Tier:</strong> <span>" + element.Tier + 
        "</span></p><p><strong>Activation: </strong><span>" + element.Activation + "</span></p><p><strong>Ranked: </strong><span>" + element.Ranked + 
        "</span></p><p><strong>Tags: </strong><span>" + element.Tags.join(', ') + "</span></sp></div>" + element.Text);
    });

    $('[data-toggle="popover"]').popover({
        container: 'body',
        trigger: 'focus'
    });
}

$( document ).ready(function() {
    $("select").change( function() {
        filter_talents();
    });
    filter_talents('All','All');
});

var talent_list = [
    {
        Name: 'Unstoppable',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: '<p>If a Critical Injury roll is 1 or reduced to 1, your character does not receive the critical injury.</p>',
        Source: 'ACRB'
    },
    {
        Name: 'Unto the Breach',
        Tier: 2,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: '<p>If you made a social check on your turn, and you are not behind cover, increase your ranged defense by 1.</p>',
        Source: 'PHE'
    },
    {
        Name: 'Wraithbane',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Combat'],
        Text: '<p>Your character counts the Critical rating of their weapon as one lower to a minimum of 1 when making an attack targeting an undead adversary.</p>',
        Source: 'ROT'
    },
    {
        Name: 'All-Terrain Driver',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: '<p>Your character does not suffer the usual penalties for driving through difficult terrain when using Piloting.</p>',
        Source: 'ACRB, ETU, ND'
    },
    {
        Name: 'Bedside Manner',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Medicine'],
        Text: "<p>When a patient under your character's care heals wounds from natural rest, they heal additional wounds equal to twice your character's ranks in Bedside Manner.</p>",
        Source: 'ROT - Apothecary'
    },
    {
        Name: 'Black Market Contacts',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Skulduggery','Social'],
        Text: '<p>When purchasing illegal goods, your character may reduce rarity by 1 per rank of Black Market Contacts, increasing cost by 50 percent of base cost per reduction.</p>',
        Source: 'ECRB'
    },
    {
        Name: 'Bought Info',
        Tier: 1,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Skulduggery'],
        Text: "<p>When making any Knowledge skill check, your character can isntead use this talent to spend an amount of currency equal to fifty times the difficulty of the check and automatically succeed on the Knowledge check with one uncanceled <span class='genesys'>s</span> (instead of rolling). At your GM's discretion, your character may not be able to use Bought Info if the information is particularly sensitive or difficult to find, or buying it doesn't make narrative sense. The GM will tell you how long it takes to find an expert for sale.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Brace',
        Tier: 1,
        Activation: 'Active (Maneuver)',
        Ranked: 'Yes',
        Tags: ['Athletics'],
        Text: '<p>As a maneuver, your character may Brace themselve. They remove <span class="dice setback">b</span> per rank of Brace from the next skill check based on changing conditions, inclement weather, unstable surfaces, zero gravity, heavy gravity, or other disruptive physical obstacles that would make a skill check more difficult.</p>',
        Source: 'ACRB, ECRB'
    },
    {
        Name: 'Bullrush',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Brawl', 'Melee'],
        Text: '<p>When your character makes a Brawl or Melee combat check after using a maneuver to engage a target, you may spend <span class="genesys">aaa</span> or <span class="genesys">t</span> to use this talent or to knock the target prone and move them up to one range band way from your character.</p>',
        Source: 'ROT'
    },
    {
        Name: "Call 'Em",
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Ranged'],
        Text: '<p>Your character does not add <span class="setback dice">b</span> to combat checks due to the use of the <a class="pop pop-info" data-toggle="popover" data-html="true" tabindex="0" title="Targeting Specific Items" data-content="Normally, when targeting a specific item, you add ' + "<span class='dice setback'>bb</span> to your roll (or <span class='dice setback'>b</span> if taking two Aim maneuvers)." + '">Aim Maneuver<a>.</p>',
        Source: 'FC'
    },
    {
        Name: 'Catfall',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Athleticism', 'Tough'],
        Text: '<p>When rolling Athletics or Coordination to reduce damage from falling, your character adds <span class="dice boost">b</span>. In addition, reduce damage and strain suffered from a fall by 1 per rank of Catfall.</p>',
        Source: 'CCC-Tom Cruise'
    },
    {
        Name: 'Challenge!',
        Tier: 1,
        Activation: 'Active (Maneuver)',
        Ranked: 'Yes',
        Tags: ['Brawl', 'Melee'],
        Text: '<p>Once per encounter, your character may use this talent to choose a number of adversaries within short range no greater than your characters ranks in Challenge (a minion group counts as a single adversary for this purpose). Until the encounter ends or your character is incapacitated, these adversaries add <span class="dice boost">b</span> to combat checks targeting your character and <span class="dice setback">bb</span> to combat checks targeting other characters.</p>',
        Source: 'ROT'
    },
    {
        Name: 'Clever Retort',
        Tier: 1,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Once per encounter, your character may use this talent to add an automatic <span class='genesys'>hh</span> to another character's social skill check.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Dark Insight',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>Your character may use Lore as their Magical Strength sSkill (for example, replacing Science in Blue Magic). Additionally, they add <span class='dice boost'>b</span> to all Lore rolls.</p>",
        Source: 'ROT-ish'
    },
    {
        Name: 'Defensive Sysops',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Computers'],
        Text: "<p>When attempting to defend a computer system against intrusion (or when someon attempts to hack a computer owned or programmed by your character), your character adds <span class='dice setback'>bb</span> to their opponent's checks. If your character has access to the computer system when the intrusion takes place, they are automatically aware of the intrusion.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Deflect Spell',
        Tier: 1,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'Yes',
        Tags: ['Magic'],
        Text: "<p>When your character suffers a hit from a magic-skill based combat check, after damage is calculated but before soak is applied (so immediately after Step 3 of Perform a Combat check, Core Rules page 102), your character may suffer 3 strain to re use this talent to reduce the damage of the hite by two plus their ranks in Deflect Spell. This talent can only be used once per hit.</p>",
        Source: 'CCC-Richard Buxton'
    },
    {
        Name: 'Desperate Recovery',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p>Before your character heals strain at the end of an encounter, if their strain is more than half of their strain threshold, they heal two additional strain.</p>",
        Source: 'GCRG'
    },
    {
        Name: 'Duelist',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl', 'Melee'],
        Text: "<p>Your character adds <span class='dice boost'>b</span> to their melee combat checks while engaged with a single opponent. Your characters adds <span class='dice setback'>b</span> to their melee combat bhecks while engaged with three or more opponents.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Dungeoneer',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Adventurer', 'Awareness'],
        Text: "<p>After your character makes a Perception, Survival, or Vigilance check to notice, identify, or avoid a threat in a cavern, subterranean ruin, or similar location, your character cancels a number of uncanceled <span class='genesys'>h</span> no greater than your character's ranks in Dungeoneer.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Durable',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>Your character reduces any Critical Injury result they suffer by 10 per rank of Durable, to a minimum of 01.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Forager',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Adventurer'],
        Text: "<p>Your character removes up to <span class='dice setback'>bb</span> from any skill checks they make to find food, water, or shelter. Checks to forage or search the area that your character makes take half the time they would normally.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Grit',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>Each rank of Grit increases yoru character's strain threshold by one.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Hamstring Shot',
        Tier: 1,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Ranged'],
        Text: "<p>Once per round, your character may use this talent to perform a ranged combat check against one non-vehicle target within range of the weapon used. If the check is successful, halve the damage inflicted by the attack (before reducing damage by the target's soak). The target is immobilized until the end of its next turn.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Intuitive Casting',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Magic'],
        Text: "<p>Your character adds <span class='dice boost'>b</span> for each rank of Intuitive Casting to any magic checks they make against any targets that have not yet taken their turn in the current encounter.</p>",
        Source: 'CCC-TheSapient'
    },
    {
        Name: 'Jump Up',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Athleticism'],
        Text: "<p>Once per round during your character's turn, your character may use this talent to stand from a prone or seated position as an incidental.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Knack for It',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Knowledge'],
        Text: "<p>When you purchase this talent for your character, select one skill. Your character removes <span class='dice setback'>bb</span> from any checks they make using this skill. Each additional time you purchase this talent for your character, select two additional skills. Your character also removes <span class='dice setback'>bb</span> from any checks they make using these skills. You cannot select combat or magic skills when choosing skills for this talent.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Know Somebody',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Once per session, when attempting to purchase a legally available item, your character may use this talent to reduce its rarity by one per rank of Know Somebody.</p>",
        Source: 'GCRB'
    },
    {
        Name: "Let's Ride",
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Athleticism', 'Vehicles'],
        Text: "<p>Once per round during your character's turn, your character can use this talent to mount or dismount from a vehicle or animal, or move from one position in a vehicle to another (such as from the cockpit to a gun turret) as an incidental. In addition, if your character suffers a short-range fall (see Core Rules page 112) from a vehicle or animal, they suffer no damage and land on their feet.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'One with Nature',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Adventurer'],
        Text: "<p>When in the wilderness, your character may make a <strong>Simple (-) Survival check</span>, instead of Discipline or Cool, to recover strain at the end of an encounter (see Core Rules page 117).</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Wheel and Deal',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>When selling goods legally, gain 10% more currency per rank of Wheel and Deal.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Overchannel',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Magic'],
        Text: "<p>When casting a spell, your character may select a number of additional effect in (<span class='dice difficulty'>d</span>) up to their ranks in Overchannel. The effect must be limited to single <span class='dice difficulty'>d</span> effects. Your character gains <span class='genesys'>hh</span> per <span class='dice difficulty'>d</span> added in this way to the roll, rather than increasing the difficulty of the check. This is in addition to any threat rolled normally. Threat added by this talent can be cancelled by rolled advantages.</p>",
        Source: 'CCC-ESP77'
    },
    {
        Name: 'Painful Blow',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Combat'],
        Text: "<p>When your character makes a combat check, you may voluntarily increase the difficulty by one to use this talent. If the target suffers one or more wounds from the combat check, the target suffers 2 strain each time they perform a maneuver until the end of the encounter.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Parry',
        Tier: 1,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'Yes',
        Tags: ['Melee'],
        Text: "<p>When your character suffers a hit from a melee combat check, after damage is calculated but before soak is applied (so immediately after Step 3 of Perform a Combat check, Core Rules page 102), your character may suffer 3 strain to use this talent to reduce the damage of the hit by two plus their ranks in Parry. This talent can only be used once per hit, and your character needs to be wielding a Melee weapon.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Physician',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Medicine'],
        Text: "<p>When making a Medicine check to help a character heal wounds, the target heals 1 additional strain per rank of Physician.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Proper Upbringing',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>When your character makes a social skill check in polite company (as determined by your GM), they may suffer a number of strain to use this talent to add an equal number of <span class='genesys'>a</span> to the check. The number may not exceed your character’s ranks in Proper Upbringing.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Quick Draw',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Melee','Ranged'],
        Text: "<p>Once per round on your character’s turn, they may use this talent to draw or holster an easily accessible weapon or item as an incidental. Quick Draw also reduces a weapon’s Prepare rating by one, to a minimum of one.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Quick Strike',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Combat'],
        Text: "<p>Your character adds <span class='dice boost'>b</span> for each rank of Quick Strike to any combat checks they make against any targets that have not yet taken their turn in the current encounter.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Rapid Reaction',
        Tier: 1,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'Yes',
        Tags: ['Awareness','Combat'],
        Text: "<p>Your character may suffer a number of strain to use this talent to add an equal number of <span class='genesys'>s</span> to a Vigilance or Cool check they make to determine Initiative order. The number may not exceed your character’s ranks in Rapid Reaction.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Rapid Recovery',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>When healing straing after an encounter, heal 1 additional strain per rank of Rapid Recovery.</p>",
        Source: 'ABGR,ACRB,ECRB,FBGR,FCRB'
    },
    {
        Name: 'Redundant Systems',
        Tier: 1,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Mechanics','Vehicles'],
        Text: "<p>Once per session, may take a Redundant Systems action; make an <strong>Easy (<span class='dice difficulty'>d</span>) Mechanics check</span> to harvest components from a functioning device to repair a broken one without breaking the first device.</p>",
        Source: 'ACRB,ECRB'
    },
    {
        Name: 'Reflect',
        Tier: 1,
        Activation: 'Active (Incidental, Out of Tunr)',
        Ranked: 'Yes',
        Tags: ['Awareness', 'Melee'],
        Text: "<p>When making a Medicine check to help a character heal wounds, the target heals 1 additional strain per rank of Physician.</p>",
        Test: "<p>When your character suffers a hit from a Ranged combat check, after damage is calculated but before soak is applied, your character may suffer 3 strain to use this talent to reduce the damage of the hit by two plus their ranks in Reflect. This talent can only be used once per hit, and your character needs to be wielding a Shield deemed appropriate by the GM.</p>",
        Source: 'FCRB'
    },
    {
        Name: 'Second Wind',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p><em>You may not take this talent if you have taken the Heroic Recovery talent.</em></p><p>Once per encounter, your character may use this talent to heal an amount of strain equal to their ranks in Second Wind.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Extra Ammo',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Ranged'],
        Text: "<p>Your character cannot run out of ammo due to a <span class='genesys'>d</span>. Items with the Limited Ammo quality run out of ammo per usual.</p>",
        Source: 'ACRB, ECRB'
    }
]