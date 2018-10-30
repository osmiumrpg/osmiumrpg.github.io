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
            if (['Brawl','Melee','Ranged'].includes(tag)) {
                return (element.Tags.includes(tag) || element.Tags.includes('Combat'));
            }
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

    console.log("Filtered Talents Count: " + filtered_talents.length);
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
        Text: "<p>Your character may use Lore as their Magical Strength Skill (for example, replacing Science in Blue Magic). Additionally, they add <span class='dice boost'>b</span> to all Lore rolls.</p>",
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
        Source: 'ACRB,ECRB'
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
        Source: 'FCRB'
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
        Text: "<p>Once per session, may take a Redundant Systems action; make an <strong>Easy (<span class='dice difficulty'>d</span>) Mechanics check</strong> to harvest components from a functioning device to repair a broken one without breaking the first device.</p>",
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
        Name: 'Shield Slam',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p>When your character uses a shield to attack a minion or rival, you may spend <span class='genesys'>aaaa</span> or <span class='genesys'>t</span> to stagger the target until the end of the target's next turn.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Solid Repairs',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Mechanics','Vehicles'],
        Text: "<p>Your character repairs +1 hull trauma per rank of Solid Repairs whenever they repair a starship or vehicle.</p>",
        Source: 'ACRB,ECRB,FCRB'
    },
    {
        Name: 'Soothing Tone',
        Tier: 1,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Beasts'],
        Text: "<p>Once per encounter, your character may take a Soothing Tone action. They make an <strong>Average (<span class='dice difficulty'>dd</span>) Survival check</strong> to allow a beast to recover strain equal to <span class='genesys'>s</span>.</p>",
        Source: 'SOT,SS'
    },
    {
        Name: 'Surgeon',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Medicine'],
        Text: "<p>When making a Medicine check to help a character heal wounds, the target heals 1 additional wound per rank of Surgeon.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Swift',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Athleticism','Adventurer'],
        Text: "<p>Your character does not suffer the penalties for moving through difficult terrain (they move through difficult terrain at normal speed without spending additional maneuvers).</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Tavern Brawler',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl'],
        Text: "<p>Your character adds <span class='genesys'>a</span> to Brawl checks and combat checks using improvised weapons.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Toughened',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>Each rank of Toughened increases your character’s wound threshold by two.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Tumble',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Athleticism'],
        Text: "<p>Once per round on your character's turn, they may suffer 2 strain to disengage from all engaged adversaries.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Unremarkable',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Adventurer'],
        Text: "<p>Other characters add <span class='genesys'>f</span> to any checks made to find or identify your character in a crowd. The GM may rule this does not apply if you are distinctive because of your species or accoutrements (<em>a Vrar on an all-Aven planet, for example, or whilst wearing a mech suit</em>).</p>",
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
    },

    //
    // -- TIER 2 -- 
    //

    {
        Name: 'Adaptable',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Adventurer','Human'],
        Text: "<p><em>You must be a Human to take this talent.</em></p><p>Your character adds <span class='dice boost'>b</span> to all General Skill checks in which they have no ranks of training.</p>",
        Source: 'PHE'
    },
    {
        Name: 'Adroitness',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Adventurer','Athleticism'],
        Text: "<p>When first acquired, choose a general skill. When making a check with that skill, reduce the time required by 25%. The GM may determine that this talent may not be used with certain skills or activities.</p><p>For each rank, select an additional two skills.",
        Source: 'CCC-Swordbreaker'
    },
    {
        Name: 'Animal Expertise',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Beasts'],
        Text: "<p>Add <span class='dice boost'>b</span> per rank of Animal Expertise to all checks when interacting with beasts or animals (including combat checks). Add +10 to Critical Injury results against beasts or animals per rank of Animal Expertise.</p>",
        Source: 'ECRB,FCRB'
    },
    {
        Name: 'Barrage',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Ranged','Vehicles'],
        Text: "<p>Add 1 damage per rank of Barrage to 1 hit of a successful attack while using Ranged or Gunnery skills at long or extreme range.</p>",
        Source: 'FIB,ECRB'
    },
    {
        Name: 'Beast Wrangler',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Beasts'],
        Text: "<p>Add <span class='dice boost'>b</span> per rank of Beast Wrangler to checks to tame or wrangle creatures.</p>",
        Source: 'SOT'
    },
    {
        Name: 'Berserk',
        Tier: 2,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Brawl','Melee'],
        Text: "<p>Once per encounter, your character may use this talent. Until the end of the encounter or until they are incapacitated, your character adds <span class='genesys'>saa</span> to all melee combat checks they make. However, opponents add <span class='genesys'>s</span> to all combat checks targeting your character. While berserk, your character cannot make ranged combat checks or magic checks. At the end of the encounter (or when they are incapacitated), your character suffers 6 strain.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Blackmail',
        Tier: 2,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Skulduggery','Social'],
        Text: "<p>When an NPC exceeds their strain threshold, you may spend 1 Story Point to convince that NPC to perform a single task of your choice.</p>",
        Source: 'DA'
    },
    {
        Name: 'Blooded',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>Add <span class='dice boost'>b</span> per rank of Blooded to all checks to resist or recover from poisons, venoms, or toxins. Reduce duration of ongoing poisons by 1 round per rank of Blooded to a minimum of 1.</p>",
        Source: 'ACRB,ECRB'
    },
    {
        Name: 'Bulwark',
        Tier: 2,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p><em>Your character must have purchased the Parry talent to benefit from this talent.</em></p><p>While wielding a weapon with the Defensive quality, your character may use Parry to reduce the damage of an attack targeting an engaged ally.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Burly',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Melee','Tough'],
        Text: "<p>Reduce any wielded weapon's Cumbersome quality and Encumbrance rating by a number equal to ranks in Burly, to a minimum of 1.</p>",
        Source: 'FIB,DC'
    },
    {
        Name: 'Command',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>Add <span class='dice boost'>b</span> per rank of Command when making Leadership checks. Affected targets add <span class='dice boost'>b</span> to Discipline checks for the next 24 hours.</p>",
        Source: 'ACRB,ECRB,FCRB'
    },
    {
        Name: 'Confidence',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>Your character may decrease the difficulty of Discipline checks to avoid fear by 1 per rank of Confidence, to a minimum of <strong Easy (<span class='dice difficulty'>d</span>)</strong>.</p>",
        Source: 'ACRB,ECRB,FCRB'
    },
    {
        Name: 'Coordinated Assault',
        Tier: 2,
        Activation: 'Active (Maneuver)',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>Once per turn, your character may use this talent to have a number of allies engaged with your character equal to your ranks in Leadership add <span class='genesys'>a</span> to all combat checks they make until the end of your character’s next turn. The range of this talent increases by one band per rank of Coordinated Assault beyond the first.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Counteroffer',
        Tier: 2,
        Activation: 'Active (Action)',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>Once per session, your character may use this talent to choose one non-Nemesis adversary within medium range and make an <strong>opposed Negotiation versus Discipline check</strong>. If successful, the target becomes staggered until the end of their next turn. At your GM’s discretion, you may spend <span class='genesys'>t</span> on this check to have the adversary become an ally until the end of the encounter. However, the duration of this may be shortened or extended depending on whether your GM feels your offer is appealing to the adversary and whether your character follows through on their offer!</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Daring Aviator',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Vehicles'],
        Text: "<p>Before your character makes a Piloting check, they may add a number of <span class='genesys'>h</span> to the results to use this talent to add an equal number of <span class='genesys'>s</span>. The number may not exceed your character’s ranks in Daring Aviator.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Debilitating Shot',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>Upon successful attack with a starship or vehicle weapon, may spend <span class='genesys'>aa</span> to reduce the maximum speed of the target by 1 until the end of the next round.</p>",
        Source: 'ACRB,ND'
    },
    {
        Name: 'Defensive Stance',
        Tier: 2,
        Activation: 'Active (Maneuver)',
        Ranked: 'Yes',
        Tags: ['Combat', 'Tough'],
        Text: "<p>Once per round, your character may suffer a number of strain no greater than their ranks in Defensive Stance to use this talent. Then, until the end of your character’s next turn, upgrade the difficulty of all melee combat checks targeting your character a number of times equal to the strain suffered.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Block',
        Tier: 2,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p><em>Your character must have purchased the Parry talent to benefit from this talent.</em></p><p>While wielding a shield, your character may use the Parry talent to reduce damage from ranged attacks as well as melee attacks targeting your character.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Defensive Sysops (Improved)',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Computers'],
        Text: "<p><em>Your character must have purchased the Defensive Sysops talent to benefit from this talent.</em></p><p>Before adding <span class='dice setback'>bb</span> from Defensive Sysops to a check, use this talent to add <span class='genesys'>fh</span> to the results of the check instead.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Disorient',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Combat','Skulduggery'],
        Text: "<p>After hitting a target with combat check, your character may spend <span class='genesys'>aa</span> to disorient the target for number of rounds equal to your character's ranks in Disorient.</p>",
        Source: 'ACRB,ECRB'
    },
    {
        Name: 'Dirty Tricks',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Combat','Skulduggery'],
        Text: "<p>After your character inflicts a Critical Injury on an adversary, you may use this talent to upgrade the difficulty of that adversary’s next check.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Distracting Behavior',
        Tier: 2,
        Activation: 'Active (Maneuver)',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>Make a Distracting Behavior maneuver and suffer strain no greater than ranks in Cunning. Until the beginning of next turn, an equal number of engaged NPC's suffer <span class='genesys'>h</span> on all checks. Range increases with additional ranks of Distracting Behavior.</p>",
        Source: 'FH'
    },
    {
        Name: 'Dual Wielder',
        Tier: 2,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Brawl','Melee'],
        Text: "<p>Your character may use this talent to decrease the difficulty of the next combined combat check (see Two- Weapon Combat, on Core Rules <a class='pop pop-info' data-toggle='popover' tabindex='0' title='Dual Wielding' data-content='Normally, the difficulty of a dual wield attack is increased by one.'>page 108</a>) they make during the same turn by one.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Dynamic Fire',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Ranged'],
        Text: "<p>When making a ranged attack while engaged with an opponent, the character may suffer 2 strain to reduce the ranged modifier added for being engaged by 1 for the attack. <em>So, when firing a two-handed Ranged weapon, the character only increases the difficulty by 1 when engaged, and when firing a one-handed Ranged weapon, they don’t increase the difficulty at all.</em></p>",
        Source: 'ACRB'
    },
    {
        Name: 'Exploit',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Melee','Ranged','Skulduggery'],
        Text: "<p>When your character makes a combat check with a Ranged or light Melee weapon, they may suffer 2 strain to use this talent to add the Ensnare quality to the attack. The rating of the Ensnare quality is equal to your character’s ranks in Exploit.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Fan the Hammer',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Ranged'],
        Text: "<p>Once per encounter before making a combat check with a pistol (your GM has the final say on whether a weapon is a pistol or not), your character may use this talent to add the Auto-fire quality to the pistol when resolving the check. If your character does, the weapon runs out of ammo exactly as with an Out of Ammo result (see Core Rules page 104).</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Fatale',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>Add <span class='dice boost'>b</span> per rank in Fatale to social checks made where flirting or sexuality is brought to bear (by you or another participant in the social dynamic).</p>",
        Source: 'PHE'
    },
    {
        Name: 'Fearsome',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>When an adversary becomes engaged with the character, the character may force the adversary to make a fear check, with the difficulty equal to the character's ranks in Fearsome.</p>",
        Source: 'DC,FCRB'
    },
    {
        Name: "Fighter's Stance",
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Brawl','Melee','Tough'],
        Text: "<p>When making a combat check, if your character has performed the <a class='pop pop-info' data-toggle='popover' data-html='true' tabindex='0' title='Guarded Stance Maneuver' data-content=" + "By default, gain Melee Defense 1, and <span class='dice setback'>b</span> to your combat checks.>Guarded Stance maneuver</a>this turn, you may suffer 1 strain to ignore the penalties of the Guarded Stance maneuver</a>.</p>",
        Source: 'CCC-ESP77'
    },
    {
        Name: 'Fine Tuning',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Text: "<p>When the character repairs system strain on a starship or vehicle, they repair 1 additional strain per rank of Fine Tuning.</p>",
        Tags: ['Vehicles'],
        Source: 'ACRB,ECRB,FCRB'
    },
    {
        Name: 'Flash of Insight',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Knowledge'],
        Text: "<p>When your character generates <span class='genesys'>t</span> on a Knowledge skill check, roll <span class='dice boost'>bb</span> and add the results to the check, in addition to spending the <span class='genesys'>t</span> as usual.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Grapple',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Brawl'],
        Text: "<p>Your character may suffer 2 strain to use this talent. Until the start of your character's next turn, enemies must spend two maneuvers to disengage from your character.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Hard Headed',
        Tier: 2,
        Activation: 'Active (Action)',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>On any turn in which the character is staggered or disoriented, they may perform the Hard Headed action (this action may be specifically performed even though they are normally barred from performing actions when staggered). They make a <strong>Daunting (<span class='dice difficulty'>dddd</span>) Discipline check</strong>. If they succeed, they are no longer staggered or disoriented. The difficulty of this check decreases by one per additional rank of Hard Headed, to a minimum of <strong>Easy(<span class='dice difficulty'>d</span>)</strong>.</p>",
        Source: 'ACRB,ECRB'
    },
    {
        Name: 'Heightened Awareness',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Awareness'],
        Text: "<p>Allies within short range of your character add <span class='dice boost'>b</span> to their Perception and Vigilance checks. Allies engaged with your character add <span class='dice boost'>bb</span> instead.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Heroic Recovery',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p><em>You may not choose this talent if you have taken the Second Wind talent.</em></p><p>When your character acquires this talent, choose one characteristic. Once per encounter, you may spend one Story Point to use this talent to have your character heal strain equal to the rating of the chosen characteristic.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Hold Together',
        Tier: 2,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>The character may spend on Story Point to make a Hold Together incidental immediately after a vehicle or starship he has repaired this encounter takes damage resulting in hull trauma. The character explains why the apparently serious damage was in fact superficial, and the damage from the attack becomes system strain instead.</p>",
        Source: 'ACRB,ECRB'
    },
    {
        Name: "Hunter's Quarry",
        Tier: 2,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Ranged'],
        Text: "<p>The character may take the Hunter’s Quarry action against an opponent within long range. They make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Survival check</strong>. If the check succeeds, they upgrade the ability of all attacks made against the target by one until the end of the character's next turn.</p>",
        Source: 'ETU,SS'
    },
    {
        Name: 'Impaling Strike',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p>When your character inflicts a Critical Injury with a melee weapon, until the end of the target's next turn they may use this talent to immobilize the target (in addition to the other effects of the Critical Injury).</p>",
        Source: 'ROT'
    },
    {
        Name: 'Inspiring Rhetoric',
        Tier: 2,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Leader','Social'],
        Text: "<p>Your character may use this talent to make an <strong>Average (<span class='dice difficulty'>dd</span>) Leadership check</strong>. For each <span class='genesys'>s</span> the check generates, one ally within short range heals one strain. For each <span class='genesys'>a</span>, one ally benefiting from Inspiring Rhetoric heals one additional strain.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Inventor',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Knowledge','Mechanics'],
        Text: "<p>When your character makes a check to construct new items or modify existing ones, use this talent to add a number of <span class='dice boost'>b</span> to the check equal to ranks of Inventor. In addition, your character may attempt to reconstruct devices that they have heard described but have not seen and do not have any kinds of plans or schematics for.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Knockdown',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl','Melee'],
        Text: "<p>After hitting with a melee attack, may spend a <span class='genesys'>t</span> to knock the target prone.</p>",
        Source: 'ACRB,ECRB'
    },
    {
        Name: 'Know the Ropes',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Skulduggery'],
        Text: "<p>Add <span class='dice boost'>b</span> to checks made to escape from restraints equal to ranks in Skullduggery. Spend <span class='genesys'>t</span> to free all other allies within short range.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Kodiak',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Tough','Vrar'],
        Text: "<p><em>You must be a Vrar to take this talent.</em></p><p>Your character gains a melee Defense of 2.</p>",
        Source: 'PHE'
    },
    {
        Name: 'Loom',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Skulduggery','Social'],
        Text: "<p>When an ally engaged with the character makes a successful Charm, Deception, or Negotiation check, the character adds <span class='genesys'>a</span> per rank in Coercion to the ally's check.</p>",
        Source: 'DC'
    },
    {
        Name: 'Lucky Strike',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Combat'],
        Text: "<p>When your character purchases this talent, choose one characteristic. After your character makes a successful combat check, you may spend one Story Point to use this talent to add damage equal to your character’s ranks in that characteristic to one hit of the combat check.</p>",
        Source: 'GCRB'
    },
    {
        Name: "Bring 'Em On",
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl','Melee'],
        Text: "<p>Your character adds <span class='dice boost'>b</span> to his Brawl and Melee combat checks when engaged with multiple opponents. This includes single groups of multiple minions.</p>",
        Source: 'FCRB - Multiple Opponents'
    },
    {
        Name: 'Physical Training',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Athleticism','Tough'],
        Text: "<p>Add <span class='dice boost'>b</span> per rank of Physical Training to Athletics and Resilience checks.</p>",
        Source: 'ACRB,DOH'
    },
    {
        Name: 'Prepared Spell',
        Tier: 2,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>Once per session, your character may make a skill check to cast a spell without suffering strain.</p>",
        Source: 'CCC-TheSapient'
    },
    {
        Name: 'Pride and Joy',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Social','Vehicles'],
        Text: "<p>Choose one vehicle your character owns with a silhouette of 4 or greater; it becomes their 'Pride and Joy' vehicle. Upgrade the ability of all social checks your character makes while within short range of the vehicle once.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Programmer Dialect',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Computers','Mechanics','Social'],
        Text: "<p>The character grants <span class='dice boost'>b</span> per rank of Programmer Dialect to any tasks they direct NPC drones and V.I.s to perform.</p>",
        Source: 'ACRB,ECRB - Speaks Binary'
    },
    {
        Name: 'Quick Draw (Improved)',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Melee','Ranged'],
        Text: "<p><em>Your character must have purchased the Quick Draw Talent to benefit from this talent.</em></p><p>You may use Quick Draw twice per round. This also allows you to reduce the Prepare rating by 2 to a minimum of one.</p>",
        Source: 'FC'
    },
    {
        Name: 'Reckless Charge',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Brawl','Melee'],
        Text: "<p>After using a maneuver to move engage an adversary, your character may suffer 2 strain to use this talent. They then add <span class='genesys'>sshh</span> to the results of the next Brawl or Melee combat check they make this turn.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Resist Disarm',
        Tier: 2,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Melee','Tough'],
        Text: "<p>Suffer 2 strain to avoid being disarmed or having your character's weapon damaged or destroyed.</p>",
        Source: 'FCRB'
    },
    {
        Name: 'Scathing Tirade',
        Tier: 2,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Your character may use this talent to make an <strong>Average (<span class='dice difficulty'>dd</span>) Coercion check</strong>. For each <span class='genesys'>s</span> the check generates, one enemy within short range suffers 1 strain. For each <span class='genesys'>a</span>, one enemy affected by Scathing Tirade suffers 1 additional strain.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Selective Detonation',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Mechanics'],
        Text: "<p>When using a weapon with the Blast quality spend <span class='genesys'>a</span> to exclude 1 target that would be affected by the explosion, up to ranks in Selective Detonation.</p>",
        Source: 'ACRB,DC'
    },
    {
        Name: 'Sense Emotions',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Magic','Social'],
        Text: "<p><em>You must have at least 1 Rank in Purple Magic to take this talent.</em></p><p>Add <span class='dice boost'>b</span> to all Charm, Coercion, and Deception checks, as long as you are dealing with a non-artificial target who is not actively shielding you.</p>",
        Source: 'PHE'
    },
    {
        Name: 'Shortcut',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Athleticism','Awareness','Knowledge','Skulduggery'],
        Text: "<p>During a chase, add <span class='dice boost'>b</span> per rank in Shortcut to any checks made to catch or escape an opponent.</p>",
        Source: 'ACRB,ECRB,EV,SS'
    },
    {
        Name: 'Side Step',
        Tier: 2,
        Activation: 'Active (Maneuver)',
        Ranked: 'Yes',
        Tags: ['Athleticism','Awareness','Skulduggery','Tough'],
        Text: "<p>Once per round, your character may suffer a number of strain no greater than their ranks in Side Step to use this talent. Until the end of your character’s next turn, upgrade the difficulty of all ranged combat checks targeting your character a number of times equal to the strain suffered.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Signature Spell',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>When your character gains this talent, decide on a signature spell for them, consisting of a particular magic action and a specific set of one or more effects. When your character casts their signature spell (consisting of the exact combination of action and effects previously chosen), reduce the difficulty of the check by one.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Strong Arm',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Athleticism','Ranged'],
        Text: "<p>Treat thrown weapons as if they had 1 greater range.</p>",
        Source: 'ACRB,ECRB'
    },
    {
        Name: 'Stunning Blow',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p>While making Melee checks, your character may inflict damage as strain instead of wounds. This does not ignore soak.</p>",
        Source: 'ACRB,ECRB'
    },
    {
        Name: 'Suppressing Fire',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Ranged'],
        Text: "<p>The character and each ally within short range may spend <span class='genesys'>a</span> on their failed Ranged checks to inflict one strain on the target per rank of Suppressing Fire. Each character can only activate this effect once per round.</p>",
        Source: 'FIB,KTP'
    },
    {
        Name: 'Threaten',
        Tier: 2,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>After an adversary within short range of your character resolves a combat check that deals damage to one of your character’s allies, your character may suffer 3 strain to use this talent to inflict a number of strain on the adversary equal to your character’s ranks in Coercion. The range of this talent increases by one band per rank of Threaten beyond the first.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Time to Go',
        Tier: 2,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Athleticism','Awareness'],
        Text: "<p>The character may spend 1 Story Point to perform a Move maneuver as an out-of-turn incidental to attempt to move into cover or out of the blast range of a weapon or explosion. This incidental occurs after the character determines they would be hit by the blast, but before damage is applied.</p>",
        Source: 'ACRB,DC'
    },
    {
        Name: 'Tinkerer',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Mechanics'],
        Text: "<p>May add 1 additional hard point to a number of items equal to ranks in Tinkerer. Each item may only be modified once.</p>",
        Source: 'ACRB,ECRB,KTP'
    },
    {
        Name: 'Touch of Fate',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Adventurer'],
        Text: "<p>Once per session, add <span class='dice boost'>bb</span> to any 1 check.</p>",
        Source: 'ACRB,ECRB,FCRB'
    },
    {
        Name: 'Unarmed Parry',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl'],
        Text: "<p>May Parry while unarmed. Reduce strain cost to Parry while unarmed by 1 (to a minimum of 1).</p>",
        Source: 'ND'
    },
    {
        Name: 'Ambush',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Skulduggery'],
        Text: "<p>Once per round while benefiting from cover, the character may make an Ambush maneuver. The character may add damage equal to their ranks in the Stealth skill to one hit of the next successful combat check with a non-starship/vehicle weapon that they make against a target within short range before the end of their turn.</p>",
        Source: 'FIB'
    },
    {
        Name: 'Animal Companion',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Beasts'],
        Text: "<p>Your character creates a bond with a single animal approved by your GM. This animal must be silhouette 0 (no larger than a mid-sized dog). The bond persists as long as your character chooses, although at your GM’s discretion, the bond may also be broken due to abusive treatment or other extenuating circumstances. As long as the bond persists, the animal follows your character, and you dictate the animal’s overall behavior (although, since the animal is only bonded with the character, not dominated, it may still perform inconvenient actions such as scratching furniture, consuming rations, and marking territory).</p><p>Once per round in structured encounters, your character may spend one maneuver to direct their animal in performing one action and one maneuver during your character’s turn. The animal must be within hearing and visual range of your character (generally medium range) to do this. Otherwise, the animal does not contribute to the encounter. The specifics of its behavior are up to you and your GM.</p><p>For every additional rank of Animal Companion your character has, increase the allowed silhouette of the companion by one (this may mean your character gets a new companion, or their companion grows in size). This talent can also change in flavor depending on the nature of your game setting. While an animal companion may make sense in many settings, in a futuristic setting it may make more sense for the “animal” to be a robot or drone, for example.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Armor Master',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p>While wearing armor, increase your total soak value by 1.</p>",
        Source: 'ACRB, EBGR, ECRB, KTP'
    },
    {
        Name: 'Autohealer Specialization',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Medicine'],
        Text: "<p>When your character uses autohealers the target heals one additional wound per rank of Autohealer Specialization. The sixth autohealer and beyond each day still has no effect.</p>",
        Source: 'GCRB – Painkiller Specialization'
    },
    {
        Name: 'Backstab',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Melee','Skulduggery'],
        Text: "<p>Your character may use this talent to attack an unaware adversary using a light Melee weapon. A Backstab is a melee attack, and follows the normal rules for performing a combat check (see Core Rules page 101), using the character’s Skullduggery skill instead of Melee. If the check succeeds, each uncanceled <span class='genesys'>s</span> adds +2 damage (instead of the normal +1).</p>",
        Source: 'ROT'
    },
    {
        Name: "Back Against the Wall",
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Combat'],
        Text: "<p>When your character suffers wounds equal to half of their wound threshold or greater, add <span class='dice boost'>b</span> to all combat checks they make.</p>",
        Source: 'CCC-Swordbreaker – Life or Death'
    },
/*     {
        Name: 'Bad Press',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Once per session, choose an organization and make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Deception check</strong>. On success, organization members have their strain thresholds reduced by 1, plus 1 per <span class='genesys'>sss</span>, until the end of the session. When they do this, the player must explain how the PC disseminated the propaganda such that it has affected his targets. The chosen organization must be narrow and cohesive enough to be affected by bad publicity.</p>",
        Source: 'DA'
    },  */
    {
        Name: 'Barrel Roll',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>Your character can only use this talent while piloting a starfighter or flying vehicle of Silhouette 3 or less. When your vehicle suffers a hit from a ranged combat check, after damage is calculated but before armor is applied, your character may have their vehicle suffer 3 system strain to use this talent. Then, reduce the damage suffered by a number equal to their ranks in Piloting.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Battle Casting',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>Your character does not add <span class='dice setback'>b</span> to magic skill checks for wearing heavy armor (armor with +2 soak or higher), using a shield, or not having at least one hand free (see Table III.2–3: Penalties When Casting Spells, on Core Rules page 210).</p>",
        Source: 'ROT'
    },
    {
        Name: 'Blindsense',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Awareness'],
        Text: "<p>As long as your character can hear, you may ignore setback imposed by darkness or blindness within short range, as long as it makes sense. Each additional rank of Blindsense increases the range of this talent.</p>",
        Source: 'CCC-ESP77'
    },
    {
        Name: 'Blind Spot',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Leader','Range'],
        Text: "<p>Your character, and allies within short range, add automatic <span class='genesys'>a</span> to combat checks they make while benefiting from cover.</p>",
        Sources: 'FIB, KTP'
    },
    {
        Name: 'Blooded (Improved)',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p>As an action, make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Resilience check</strong> to immediately recover from all poisons and side effects of drugs. Reduce difficulty once per rank of Blooded.</p>",
        Source: 'UP'
    },
    {
        Name: 'Blood Magic',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>When casting a spell your character may take two wounds instead of two strain.<p>",
        Source: 'CCC-ESP77'
    },
    {
        Name: 'Body Guard',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'Yes',
        Tags: ['Leader','Tough'],
        Text: "<p>Once per round, your character may suffer a number of strain no greater than their ranks in Body Guard to use this talent. Choose one ally engaged with your character; until the end of your character’s next turn, upgrade the difficulty of all combat checks targeting that ally a number of times equal to the strain suffered.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Bonded Implement',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>Choose one magical implement your character owns when taking this talent. Your character becomes bonded to this implement, and no other person may use it. Your character may attempt to summon it by making a <strong>Hard (<span class='dice difficulty'>ddd</span>) Magic check</strong>, if it's within miles equal to the square of your Strength Skill.  If your chosen implement is ever permanently lost or destroyed, you may select a new one of the same value.</p>",
        Source: 'CCC-TheSapient'
    },
    {
        Name: 'Cavalier',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Beast'],
        Text: "<p>While riding a mount trained for battle (typically a war mount [see page 105] or flying mount [see page 104]), once per round your character may use this talent to direct the mount to perform an action.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Center of Being',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'Yes',
        Tags: ['Melee','Tough'],
        Text: "<p>While wielding a weapon with the Defensive quality, your character may perform a Center of Being maneuver. Until the beginning of your character's next turn, whenever an enemy makes a melee attack targeting them, the critical rating of the enemy's weapon counts as 1 higher per rank of Center of Being.</p>",
        Source: 'FCRB'
    },
    {
        Name: 'Confidence (Improved)',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Leader','Social'],
        Text: "<p><em>Your character must have purchased the Confidence talent to benefit from this talent.</em></p><p>May spend a on a fear check to steady the nerves of allies making the same fear check. If the character does so, each ally within short range who makes the fear check adds s equal to the character's rank in Confidence.</p>",
        Source: 'LBE'
    },
    {
        Name: 'Congenial',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>When attempting a Charm or Negotiation check, the character may suffer a number of strain to downgrade the difficulty of the check a number of times equal to the strain suffered. When the character is the target of a Charm or Negotiation check, the character may likewise suffer a number of strain to upgrade the difficulty of the check by a similar amount. In either case, the number of strain may not exceed the character’s ranks in Congenial.</p>",
        Sources: 'FH, FC, DOH'
    },
    {
        Name: 'Counterattack',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p><em>Your character must have purchased the Improved Parry talent to benefit from this talent.</em></p><p>When your character uses the Improved Parry talent to hit an attacker, they may also activate an item quality of the weapon they used as if they had generated aa on a combat check using that weapon.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Creative Killer',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl','Melee','Skulduggery'],
        Text: "<p>Your character reduces the critical rating of improvised weapons by 2 (to a minimum of 1).</p>",
        Source: 'ACRB'
    },
    {
        Name: 'Crippling Mage',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>Once per session, your character may add the Deadly quality to an attack spell without increasing the difficulty.</p>",
        Source: 'CCC-ESP77 – Combat Caster'
    },
    {
        Name: 'Daring Turn',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>When an opponent has gained the advantage on a starship or vehicle being piloted by your character, your character may spend 2 strain to perform a Daring Turn maneuver to remove the effects.</p>",
        Source: 'SOT'
    },
    {
        Name: 'Disarm',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl','Melee'],
        Text: "<p>Your character need only spend <span class='genesys'>aa</span> with a successful Brawl or Melee check to disarm opponent (or <span class='genesys'>t</span>, per usual).</p>",
        Source: 'FCRB'
    },
    {
        Name: 'Disarming Smile',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>Your character can make a Disarming Smile action to make an opposed Charm check against one target within short range. If they succeed, decrease the target’s Defense (melee and ranged) by a number equal to your character’s ranks in Disarming Smile (to a minimum of zero) until the end of the encounter.</p>",
        Source: 'FC'
    },
    {
        Name: 'Distant Spell',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>Once per session, when casting a spell the first Range enhancement does not increase the difficulty of the spell.</p>",
        Source: 'CCC-ESP77'
    },
    {
        Name: 'Distinctive Style',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Computers'],
        Text: "<p>When making a Computers check to hack a system or break into a secured network, before rolling, your character may use this talent to add <span class='genesys'>sshh</span> to the results.</p><p>If you are using the optional hacking rules on page 232 and your check generates <span class='genesys'>hh</span>, your GM should spend it on the <em>I Know You!</em> option in Table III.2-22 on page 234 of the Genesys Core Rulebook.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Dodge',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>When your character is targeted by a combat check (ranged or melee), they may suffer a number of strain no greater than their ranks in Dodge to use this talent. Then, upgrade the difficulty of the combat check targeting your character a number of times equal to the strain suffered.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Dual Strike',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Melee','Range'],
        Text: "<p>When resolving a combined check to attack with two weapons in a melee combat, your character may suffer 2 strain to use this talent to hit with the secondary weapon (instead of spending <span class='genesys'>aa</span>).</p>",
        Source: 'ROT'
    },
    {
        Name: 'Eagle Eyes',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Range'],
        Text: "<p>Once per encounter, before making a ranged combat check, you may use this talent to increase your weapon’s range by one range band (to a maximum of extreme range). This lasts for the duration of the combat check.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Easy Prey',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Combat','Leader','Skulduggery'],
        Text: "<p>Your character may suffer 3 strain to use this talent. Until the start of your character’s next turn, your character and allies within short range add <span class='dice boost'>bb</span> to combat checks against immobilized targets.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Encouraging Words',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Leader'],
        Text: "<p>After an engaged ally fails a check, may suffer 1 strain to assist that ally's next check this encounter as an out of turn incidental.</p>",
        Sources: 'DA, LBE, DOH'
    },
    {
        Name: 'Eye for Detail',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Awareness','Computers','Knowledge','Mechanics'],
        Text: "<p>After making a Mechanics or Computers check but before interpreting the results, your character may suffer a number of strain up to ranks in Eye for Detail. Doing so converts that many <span class='genesys'>s</span> to <span class='genesys'>a</span>, though they must still have at least one <span class='genesys'>s</span> to succeed on the check.</p>",
        Source: 'SM'
    },
    {
        Name: 'Feint',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Brawl','Melee'],
        Text: "<p>Your character may spend <span class='genesys'>t</span> or <span class='genesys'>aaa</span> generated by a missed melee attack to upgrade the difficulty of their opponent's next attack targeting your character a number of times equal to their ranks in Feint.</p>",
        Source: 'FCRB'
    },
    {
        Name: 'Feral Strength',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Brawl','Melee'],
        Text: "<p>Add 1 damage per rank of Feral Strength to one hit of successful attacks made using Brawl or Melee.</p>",
        Sources: 'ABGR, ACRB, EBGR, ECRB'
    },
    {
        Name: 'Field Commander',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Leader'],
        Text: "<p>Your character may use this talent to make an <strong>Average (<span class='dice difficulty'>dd</span>) Leadership check</strong>. If successful, a number of allies equal to your character’s Presence may immediately suffer 1 strain to perform one maneuver (out of turn). If there are any questions as to which allies take their maneuvers first, your character is the final arbiter.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Fire Control',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Leader','Vehicles'],
        Text: "<p>When in a starship or vehicle, your character can make a Fire Control maneuver. If they do so, all combat checks from the starship or vehicle count the silhouette of the target as one higher than normal until the beginning of your character’s next turn. This effect does not stack with multiple uses of the Fire Control maneuver.</p>",
        Source: 'ACRB'
    },
    {
        Name: 'Forbidden Knowledge',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>Once per session, suffer strain no greater than ranks in your Magic Strength skill to increase your ranks in Magic Strength skill by an equal number for the purpose of determining the strength of additional effects for the next spell cast during that round. In this case, your temporary ranks in Knowledge may exceed the usual limit of 5.</p>",
        Source: 'CCC-Klort'
    },
    {
        Name: 'Forgot to Count?',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Adventurer', 'Tough'],
        Text: "<p>When an opponent makes a ranged combat check, you can spend <span class='genesys'>hh</span> from that check to use this talent to cause their weapon to run out of ammo (see Core Rules page 104), as long as the weapon can normally run out of ammunition.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Formation Tactics',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Leader'],
        Text: "<p>Make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Leadership check</strong>. If successful, choose a number of allies within short range equal to <span class='genesys'>s</a> generated. Upgrade the difficulty of attacks against these allies once until the end of your character's next turn.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Freerunning (Improved)',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Athleticism'],
        Text: "<p><em>Your character must have purchased the Freerunning talent to benefit from this talent.</em></p><p>Once per round, before performing a Move maneuver, your character may suffer 4 strain. If they do so, they may use their Move maneuver to move to any location within medium range (even straight up) as long as there is some sort of object to move across or a path to move along.</p>",
        Source: 'EV'
    },
    {
        Name: 'Freerunning',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Athleticism'],
        Text: "<p><em>You must have at least 1 Rank in a Magic skill to take this talent.</em></p><p>Once per round, before performing a Move maneuver, the character may suffer 1 strain. If they do so, they may use their Move maneuver to move to any location within short range (even straight up), as long as there is some sort of object o move across or a path to move along.</p>",
        Source: "EV"
    }
]