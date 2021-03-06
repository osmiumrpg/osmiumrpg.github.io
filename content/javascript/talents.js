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
        Text: '<p>Your character counts the Critical rating of their weapon as one lower (to a minimum of 1) when making an attack targeting an undead adversary.</p>',
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
        Text: "<p><em>You may not purchase this talent if you currently have more ranks of Grit than you do of Discipline.</em></p><p>Each rank of Grit increases your character's strain threshold by one.</p>",
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
        Text: "<p>When in the wilderness, your character may make a <strong>Simple (-) Survival check</strong>, instead of Discipline or Cool, to recover strain at the end of an encounter (see Core Rules page 117).</p>",
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
        Text: "<p>When your character makes a social skill check in polite company (as determined by your GM), they may suffer a number of strain to use this talent to add an equal number of <span class='genesys'>a</span> to the check. The number may not exceed your character's ranks in Proper Upbringing.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Quick Draw',
        Tier: 1,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Melee','Ranged'],
        Text: "<p>Once per round on your character's turn, they may use this talent to draw or holster an easily accessible weapon or item as an incidental. Quick Draw also reduces a weapon's Prepare rating by one, to a minimum of one.</p>",
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
        Text: "<p>Your character may suffer a number of strain to use this talent to add an equal number of <span class='genesys'>s</span> to a Vigilance or Cool check they make to determine Initiative order. The number may not exceed your character's ranks in Rapid Reaction.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Rapid Recovery',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>When healing strain after an encounter, heal 1 additional strain per rank of Rapid Recovery.</p>",
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
        Text: "<p><em>You may not purchase this talent if you currently have more ranks of Toughened than you do of Resilience.</em></p><p>Each rank of Toughened increases your character's wound threshold by two.</p>",
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
/*     {
        Name: 'Exploit Weakness',
        Tier: 1,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Knowledge','Leader'],
        Text: "<p><em>You must have purchased the Identify Weakness talent to benefit from this talent.</em></p><p>You may allow your allies to spend your Found Weaknesses. They may only do so to generate <span class='genesys'>s</span>.</p>",
        Source: 'PHE'
    }, */
    // 
    //  TIER 2
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
        Name: 'Poison Resistance',
        Tier: 2,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Dwarf','Tough'],
        Text: "<p><em>This talent may be purchased at Tier 1 if you are a Dwarf.</em></p><p>Add <span class='dice boost'>b</span> per rank of Blooded to all checks to resist or recover from poisons, venoms, or toxins. Reduce duration of ongoing poisons by 1 round per rank of Blooded to a minimum of 1.</p>",
        Source: 'ACRB,ECRB - Blooded'
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
        Text: "<p>Your character may decrease the difficulty of Discipline checks to avoid fear by 1 per rank of Confidence, to a minimum of <strong>Easy (<span class='dice difficulty'>d</span>)</strong>.</p>",
        Source: 'ACRB,ECRB,FCRB'
    },
    {
        Name: 'Coordinated Assault',
        Tier: 2,
        Activation: 'Active (Maneuver)',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>Once per turn, your character may use this talent to have a number of allies engaged with your character equal to your ranks in Leadership add <span class='genesys'>a</span> to all combat checks they make until the end of your character's next turn. The range of this talent increases by one band per rank of Coordinated Assault beyond the first.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Counteroffer',
        Tier: 2,
        Activation: 'Active (Action)',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>Once per session, your character may use this talent to choose one non-Nemesis adversary within medium range and make an <strong>opposed Negotiation versus Discipline check</strong>. If successful, the target becomes staggered until the end of their next turn. At your GM's discretion, you may spend <span class='genesys'>t</span> on this check to have the adversary become an ally until the end of the encounter. However, the duration of this may be shortened or extended depending on whether your GM feels your offer is appealing to the adversary and whether your character follows through on their offer!</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Daring Aviator',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Vehicles'],
        Text: "<p>Before your character makes a Piloting check, they may add a number of <span class='genesys'>h</span> to the results to use this talent to add an equal number of <span class='genesys'>s</span>. The number may not exceed your character's ranks in Daring Aviator.</p>",
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
        Text: "<p>Once per round, your character may suffer a number of strain no greater than their ranks in Defensive Stance to use this talent. Then, until the end of your character's next turn, upgrade the difficulty of all melee combat checks targeting your character a number of times equal to the strain suffered.</p>",
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
        Text: "<p>After your character inflicts a Critical Injury on an adversary, you may use this talent to upgrade the difficulty of that adversary's next check.</p>",
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
        Text: "<p>When making a ranged attack while engaged with an opponent, the character may suffer 2 strain to reduce the ranged modifier added for being engaged by 1 for the attack. <em>So, when firing a two-handed Ranged weapon, the character only increases the difficulty by 1 when engaged, and when firing a one-handed Ranged weapon, they don't increase the difficulty at all.</em></p>",
        Source: 'ACRB'
    },
    {
        Name: 'Exploit',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Melee','Ranged','Skulduggery'],
        Text: "<p>When your character makes a combat check with a Ranged or light Melee weapon, they may suffer 2 strain to use this talent to add the Ensnare quality to the attack. The rating of the Ensnare quality is equal to your character's ranks in Exploit.</p>",
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
        Text: "<p>The character may take the Hunter's Quarry action against an opponent within long range. They make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Survival check</strong>. If the check succeeds, they upgrade the ability of all attacks made against the target by one until the end of the character's next turn.</p>",
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
        Text: "<p>When your character purchases this talent, choose one characteristic. After your character makes a successful combat check, you may spend one Story Point to use this talent to add damage equal to your character's ranks in that characteristic to one hit of the combat check.</p>",
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
        Text: "<p>Once per round, your character may suffer a number of strain no greater than their ranks in Side Step to use this talent. Until the end of your character's next turn, upgrade the difficulty of all ranged combat checks targeting your character a number of times equal to the strain suffered.</p>",
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
        Name: 'Summer Wizard',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p><em>Your character must have at least 1 rank of Purple Magic to benefit from this talent. Your character cannot take this talent if they have taken the Winter Wizard talent.</em></p><p>When casting an Attack spell, your character may add the <a class='pop pop-info', data-toggle='popover', tabindex='0', title='Impact effect', data-content='The attack gains the Knockdown quality. The attack also gains the Disorient quality with a rating equal to Strength skill'>Impact effect</a> without increasing the difficulty. Your character can never add the <a class='pop pop-info', data-toggle='popover', tabindex='0', title='Ice effect', data-content='The attack gains the Ensnare quality with a rating equal to Strength Skill.'>Ice effect</a>.</p>",
        Source: 'ROT - Chill of Nordros'
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
        Text: "<p>After an adversary within short range of your character resolves a combat check that deals damage to one of your character's allies, your character may suffer 3 strain to use this talent to inflict a number of strain on the adversary equal to your character's ranks in Coercion. The range of this talent increases by one band per rank of Threaten beyond the first.</p>",
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
/*     {
        Name: 'Identify Weakness',
        Tier: 2,
        Activation: 'Maneuver',
        Ranked: 'No',
        Tags: ['Knowledge'],
        Text: "<p>Once per encounter, your character may make an Identify Weakness maneuver. They make a <strong>Simple (-) Knowledge check</strong>. Count the number of uncanceled <span class='genesys'>s</span> you roll. These count as 'Found Weaknesses'. During the encounter, your character may spend a Found Weakness to add a <span class='genesys'>s</span> to a roll, after the dice are rolled but before success or damage is calculated. You may spend any number of Found Weaknesses on a roll.</p>",
        Source: 'PHE'
    }, */
    {
        Name: 'Winter Wizard',
        Tier: 2,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p><em>Your character must have at least 1 rank of Purple Magic to benefit from this talent. Your character cannot take this talent if they have taken the Summer Wizard talent.</em></p><p>When casting an Attack spell, your character may add the <a class='pop pop-info', data-toggle='popover', tabindex='0', title='Ice effect', data-content='The attack gains the Ensnare quality with a rating equal to Strength Skill.'>Ice effect</a> without increasing the difficulty. Your character can never add the <a class='pop pop-info', data-toggle='popover', tabindex='0', title='Impact effect', data-content='The attack gains the Knockdown quality. The attack also gains the Disorient quality with a rating equal to Strength skill'>Impact effect</a>.</p>",
        Source: 'ROT - Chill of Nordros'
    },
    //
    //  TIER 3
    //
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
        Text: "<p>Your character creates a bond with a single animal approved by your GM. This animal must be silhouette 0 (no larger than a mid-sized dog). The bond persists as long as your character chooses, although at your GM's discretion, the bond may also be broken due to abusive treatment or other extenuating circumstances. As long as the bond persists, the animal follows your character, and you dictate the animal's overall behavior (although, since the animal is only bonded with the character, not dominated, it may still perform inconvenient actions such as scratching furniture, consuming rations, and marking territory).</p><p>Once per round in structured encounters, your character may spend one maneuver to direct their animal in performing one action and one maneuver during your character's turn. The animal must be within hearing and visual range of your character (generally medium range) to do this. Otherwise, the animal does not contribute to the encounter. The specifics of its behavior are up to you and your GM.</p><p>For every additional rank of Animal Companion your character has, increase the allowed silhouette of the companion by one (this may mean your character gets a new companion, or their companion grows in size). This talent can also change in flavor depending on the nature of your game setting. While an animal companion may make sense in many settings, in a futuristic setting it may make more sense for the “animal” to be a robot or drone, for example.</p>",
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
        Text: "<p>Your character may use this talent to attack an unaware adversary using a light Melee weapon. A Backstab is a melee attack, and follows the normal rules for performing a combat check (see Core Rules page 101), using the character's Skullduggery skill instead of Melee. If the check succeeds, each uncanceled <span class='genesys'>s</span> adds +2 damage (instead of the normal +1).</p>",
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
        Source: 'FIB, KTP'
    },
    {
        Name: 'Poison Immunity',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p>As an action, make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Resilience check</strong> to immediately recover from all poisons and side effects of drugs. Reduce difficulty once per rank of Poison Resistance.</p>",
        Source: 'UP - Blooded (Improved)'
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
        Text: "<p>Once per round, your character may suffer a number of strain no greater than their ranks in Body Guard to use this talent. Choose one ally engaged with your character; until the end of your character's next turn, upgrade the difficulty of all combat checks targeting that ally a number of times equal to the strain suffered.</p>",
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
        Text: "<p>When attempting a Charm or Negotiation check, the character may suffer a number of strain to downgrade the difficulty of the check a number of times equal to the strain suffered. When the character is the target of a Charm or Negotiation check, the character may likewise suffer a number of strain to upgrade the difficulty of the check by a similar amount. In either case, the number of strain may not exceed the character's ranks in Congenial.</p>",
        Source: 'FH, FC, DOH'
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
        Text: "<p>Your character can make a Disarming Smile action to make an opposed Charm check against one target within short range. If they succeed, decrease the target's Defense (melee and ranged) by a number equal to your character's ranks in Disarming Smile (to a minimum of zero) until the end of the encounter.</p>",
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
        Text: "<p>Once per encounter, before making a ranged combat check, you may use this talent to increase your weapon's range by one range band (to a maximum of extreme range). This lasts for the duration of the combat check.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Easy Prey',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Combat','Leader','Skulduggery'],
        Text: "<p>Your character may suffer 3 strain to use this talent. Until the start of your character's next turn, your character and allies within short range add <span class='dice boost'>bb</span> to combat checks against immobilized targets.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Encouraging Words',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Leader'],
        Text: "<p>After an engaged ally fails a check, may suffer 1 strain to assist that ally's next check this encounter as an out of turn incidental.</p>",
        Source: 'DA, LBE, DOH'
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
        Source: 'ABGR, ACRB, EBGR, ECRB'
    },
    {
        Name: 'Field Commander',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Leader'],
        Text: "<p>Your character may use this talent to make an <strong>Average (<span class='dice difficulty'>dd</span>) Leadership check</strong>. If successful, a number of allies equal to your character's Presence may immediately suffer 1 strain to perform one maneuver (out of turn). If there are any questions as to which allies take their maneuvers first, your character is the final arbiter.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Fire Control',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Leader','Vehicles'],
        Text: "<p>When in a starship or vehicle, your character can make a Fire Control maneuver. If they do so, all combat checks from the starship or vehicle count the silhouette of the target as one higher than normal until the beginning of your character's next turn. This effect does not stack with multiple uses of the Fire Control maneuver.</p>",
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
        Text: "<p>Make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Leadership check</strong>. If successful, choose a number of allies within short range equal to <span class='genesys'>s</span> generated. Upgrade the difficulty of attacks against these allies once until the end of your character's next turn.</p>",
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
    },
    {
        Name: 'Frenzied Attack',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Brawl', 'Melee'],
        Text: "<p>When making a Melee or Brawl check, suffer a number of strain to upgrade the attack an equal number of times. The strain suffered may not exceed ranks in Frenzied Attack.</p>",
        Source: 'ACRB, ECRB'
    },
    {
        Name: 'Full Throttle',
        Tier: 3,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>While driving or flying, your character may use this talent to make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Piloting check</strong>. If successful, the top speed of the vehicle increases by one (to a maximum of 5) for a number of rounds equal to your character's Cunning.</p><p>The specifics of this talent require the optional vehicle rules, on page 220. If your game does not use these rules, this talent simply makes the vehicle go much faster than normal, with the specifics up to your GM.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Grenadier',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Ranged'],
        Text: "<p>When your character makes a ranged combat check with a weapon that has the Blast item quality, you may spend one Story Point to use this talent to trigger the weapon's Blast quality, instead of spending <span class='genesys'>a</span> (even if the attack misses). In addition, your character treats grenades as having a range of medium.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Heroic Resilience',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>Immediately after being hit by an attack but before suffering damage, spend 1 Story Point to increase soak by ranks in Resilience.</p>",
        Source: 'FIB, DC'
    },
    {
        Name: 'Heroic Will',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p>When you purchase this talent for your character, choose two characteristics. You may spend a Story Point to use this talent to have your character ignore the effects of all Critical Injuries on any skill checks using those two characteristics until the end of the current encounter. (Your character still suffers the Critical Injuries; they just ignore the effects. See Core Rules page 114.)</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Hindering Shot',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Vehicles'],
        Text: "<p>Spend a Story Point and increase the difficulty of next Gunnery check by 1. If the check deals damage, target starship or vehicle suffers system strain equal to its speed when it moves for a number of turns equal to ranks in Hindering Shot.</p>",
        Source: 'ND'
    },
    {
        Name: "Hunter's Quarry (Improved)",
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Ranged'],
        Text: "<p><em>Your character must have purchased the Hunter's Quarry talent to benefit from this talent.</em></p><p>Your character may suffer 2 strain to perform Hunter's Quarry action as a maneuver.</p>",
        Source: 'ETU, SS'
    },
    {
        Name: "Inspiring Rhetoric (Improved)",
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Leader', 'Social'],
        Text: "<p><em>Your character must have purchased the Inspiring Rhetoric talent to benefit from this talent.</em></p><p>Allies affected by your character's Inspiring Rhetoric add <span class='dice boost'>b</span> to all skill checks they make for a number of rounds equal to your character's ranks in Leadership.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Intimidating',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>May suffer a number of strain to downgrade difficulty of Coercion checks, or upgrade difficulty when targeted by Coercion checks, by an equal number. Strain suffered this way cannot exceed ranks in Intimidating.</p>",
        Source: 'ACRB, ECRB, FBGR, FCRB'
    },
    {
        Name: 'Iron Body',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Athleticism', 'Brawl', 'Tough'],
        Text: "<p>Remove <span class='dice setback'>b</p> per rank of Iron Body from Coordination and Resilience checks. Reduce the critical rating of unarmed attacks by 1 per rank of Iron Body (to a minimum of 1).</p>",
        Source: 'ND'
    },
    {
        Name: 'Lethal Blows',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Combat'],
        Text: "<p>Add +10 per rank of Lethal Blows to any Critical Injury results inflicted on opponents.</p>",
        Source: 'ACRB, ECRB, SS'
    },
    {
        Name: 'Lingering Spell',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>Your character may spend a Story Point to make the Concentration maneuver as an incidental.</p>",
        Source: 'CCC-TheSapient'
    },
    {
        Name: 'Magic Resistance',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Magic'],
        Text: "<p>Whenever you are being targeted by an enemy's spell, the caster adds <span class='dice setback'>b</span> to the check. When your character makes a check to resist a negative magic effect, may add <span class='dice boost'>b</span> to the check.</p>",
        Source: 'CCC-Klort'
    },
    {
        Name: 'Natural',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Adventurer', 'Knowledge'],
        Text: "<p>When your character purchases this talent, choose two skills. Once per session, your character may use this talent to reroll one skill check that uses one of those two skills.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'No Escape',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>May spend <span class='genesys'>aa</span> from a Coercion check or <span class='genesys'>hh</span> from a foe's Discipline check; that target cannot perform a free maneuver during his next turn.</p>",
        Source: 'KTP',
    },
    {
        Name: "Nobody's Fool",
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Social'],
        Text: "<p>May upgrade difficulty of incoming Charm, Coercion, or Deception checks once per rank of Nobody's Fool.</p>",
        Source: 'ACRB, ECRB, FCRB'
    },
    {
        Name: 'Overchannel (Improved)',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p><em>Your character must have purchased the Overchannel talent to benefit from this talent.</em><p><p>In addition to the effects of Overchannel, you may also add (<span class='dice difficulty'>dd</span>) effects. The character gains one <span class='genesys'>d</span> (including the associated failure) per (<span class='dice difficulty'>dd</span>) effect added in this way rather than increase the difficultly of the check. This is in addition to any <span class='genesys'>d</span> rolled.</p>",
        Source: 'CCC-ESP77'
    },
/*     {
        Name: 'Overwhelm Defenses',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Vehicles'],
        Text: "<p>Upon making an unsuccessful attack with a starship or vehicle weapon, your character may spend <span class='genesys'>aa</span> per rank of Overwhelm Defenses. Reduce the defense in the targeted defense zone by 1 for every <span class='genesys'>aa</span> spent for the remainder of the encounter.</p>",
        Source: 'ACRB, ND'
    }, */
    {
        Name: 'Parry (Improved)',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p><em>Your character must have purchased the Parry talent to benefit from this talent.</em></p><p>When your character suffers a hit from a melee combat check and uses Parry to reduce the damage from that hit, after the attack is resolved, you may spend <span class='genesys'>d</span> or <span class='genesys'>hhh</span> from the attacker's check to use this talent. Then, your character automatically hits the attacker once with a Brawl or Melee weapon your character is wielding. The hit deals the weapon's base damage, plus any damage from applicable talents or abilities. Your character can't use this talent if the original attack incapacitates them.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Point Blank',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Ranged'],
        Text: "<p>You character adds 1 damage per rank of Point Blank to one hit of their successful attacks made while using Ranged skills at short range or engaged.</p>",
        Source: 'ABGR, ACRB, EBGR, ECRB'
    },
    {
        Name: 'Powerful Blast',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Mechanics', 'Range'],
        Text: "<p>Increase Blast damage dealt by +1 per rank of Powerful Blast.</p>",
        Source: 'ACRB, DC',
    },
    {
        Name: 'Precise Shooting',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Range'],
        Text: "<p>When making a Ranged combat check targeting a character engaged with one of your character's allies, downgrade the difficulty of the check once (thus negating the penalty for shooting at engaged targets).</p>",
        Source: 'ROT – Precise Archery'
    },
    {
        Name: 'Preemptive Avoidance',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Athleticism', 'Awareness', 'Combat', 'Tough'],
        Text: "<p>May spend 1 Story Point to disengage from engaged enemy as an out-of-turn incidental.</p>",
        Source: 'FCRB'
    },
    {
        Name: 'Pressure Point',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Brawl', 'Medicine'],
        Text: "<p>When your character makes an unarmed Brawl check targeting a living opponent, they may use this talent to deal strain damage instead of wound damage, and inflict additional strain damage equal to their ranks in Medicine.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Pride and Joy (Improved)',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Leader', 'Tough', 'Vehicles'],
        Text: "<p><em>Your character must have purchased the Pride and Joy talent to benefit from this talent.</em></p><p>While inside your character's Pride and Joy, recover +1 strain whenever recovering strain and spend <span class='genesys'>a</span> on checks made to recover strain to allow an ally also within the vehicle to recover 1 strain.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Receptive Mind',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Chthonian'],
        Text: "<p><em>You must be a Chthonian to benefit from this talent.</em></p><p>As an out of turn incidental, you may allow a spellcaster to target you with their spell. If you do so, their next spell targeting you is not upgraded.</p>",
        Source: 'PHE'
    },
    {
        Name: 'Reflect (Improved)',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Melee', 'Tough'],
        Text: "<p><em>Your character must have purchased the Reflect talent to benefit from this talent.</em></p><p>Your character may use reflect while wielding a melee weapon deemed appropriate by the GM. When reflecting a hit that generated <span class='genesys'>d</span> or <span class='genesys'>hhh</span> may hit one target in medium range with the same damage as the initial hit, after original attack resolves.</p>",
        Source: 'FBGR, FCRB'
    },
    {
        Name: 'Scathing Tirade (Improved)',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p><em>Your character must have purchased the Scathing Tirade talent to benefit from this talent.</em></p><p>Enemies affected by your character's Scathing Tirade add <span class='dice setback'>b</span> to all skill checks they make for a number of rounds equal to your character's ranks in Coercion.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Seize the Initiative',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Athleticism', 'Leader'],
        Text: "<p>Once per session, as a maneuver, may make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Athletics check</strong>. On a success, other PCs may take their turns immediately.</p>",
        Source: 'FIB'
    },
    {
        Name: 'Sense Advantage',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Adventurer'],
        Text: "<p>Once per session, may add <span class='dice setback'>bb</span> to 1 NPC's skill check.</p>",
        Source: 'FBGR, FCRB'
    },
    {
        Name: 'Shape Spell',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Magic'],
        Text: "<p>When casting a spell with the Blast quality, your character may spend <span class='genesys'>a</span> to exclude 1 target that would otherwise be affected by the explosion, up to ranks in Shape Spell.</p>",
        Source: 'CCC-ESP77'
    },
    {
        Name: 'Shield Master',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p>While wielding a shield, your character may take the Shield Master maneuver, suffering 1 Strain. Your shield's Defensive and Deflection qualities increase by one each until the end of your next turn.</p>",
        Source: 'CCC-Direach'
    },
    {
        Name: 'Shockwave',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p>Your character treats heavy Melee weapons as possessing the Blast item quality with a rating equal to your character's ranks in Melee. Your character does not suffer damage from their weapon's Blast quality (but allies do!).</p>",
        Source: 'ROT'
    },
    {
        Name: 'Shortcut (Improved)',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Athleticism', 'Awareness', 'Knowledge', 'Skulduggery'],
        Text: "<p><em>Your character must have purchased the Shortcut talent to benefit from this talent.</em></p><p>When engaging in a chase or race, may suffer 2 strain to add <span class='genesys'>s</span> equal to ranks in Shortcut to the check.</p>",
        Source: 'ND, EV, SS'
    },
    {
        Name: 'Skilled Teacher',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'Yes',
        Tags: ['Knowledge, Leader'],
        Text: "<p>Before an ally within short range makes a skill check, if that ally has fewer ranks in that skill than your character does, your character may suffer a number of strain no greater than ranks in Skilled Teacher to add an equal number of <span class='genesys'>s</span> to the ally's check.</p>",
        Source: 'DOH'
    },
    {
        Name: 'Stunning Blow (Improved)',
        Tier: 3,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p><em>Your character must have purchased the Stunning Blow talent to benefit from this talent.</em></p><p>When dealing strain damage with Melee or Brawl checks, may spend <span class='genesys'>t</span> to stagger target for 1 round per <span class='genesys'>t</span>.</p>",
        Source: 'ACRB, ECRB'
    },
    {
        Name: 'Sunder Expertise',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Melee'],
        Text: "<p>Each <span class='genesys'>a</span> your character spends to activate a weapon's Sunder quality damages the target item two steps, instead of one.</p>",
        Source: 'DOH'
    },
    {
        Name: 'Time to Go (Improved)',
        Tier: 3,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Athleticism', 'Awareness', 'Leader'],
        Text: "<p><em>Your character must have purchased the Time to Go talent to benefit from this talent.</em></p><p>When activating Time to Go, allow 1 engaged ally to also perform an out of turn Move maneuver as an incidental to attempt to move into cover or out of the blast range of a weapon or explosion.</p>",
        Source: 'ACRB, DC'
    },
    {
        Name: 'Tricky Target',
        Tier: 3,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>Count vehicle or starship piloted as having a silhouette 1 lower when being attacked.</p>",
        Source: 'ABGR, ACRB, ECRB, FCRB'
    },
    {
        Name: 'Twisted Words',
        Tier: 3,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>When an incoming social check generates <span class='genesys'>hh</span> or <span class='genesys'>d</span>, your character may suffer 1 strain as an incidental to inflict strain equal to their ranks in Coercion on speaker.</p>",
        Source: 'DA'
    },
    //
    //  TIER 4
    //
    {
        Name: 'Armor Master (Improved)',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p><em>Your character must have purchased the Armor Master talent to benefit from this talent.</em></p><p>When wearing armor with a soak value of 2 or higher, increase defense by 1.</p>",
        Source: 'ACRB, ECRB, KTP'
    },
    {
        Name: 'Assassin Strike',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Athleticism', 'Brawl', 'Melee', 'Skulduggery'],
        Text: "<p>After making a successful melee check, may spend a Story Point to disengage from an opponent as an incidental.</p>",
        Source: 'CCC-Tom Cruise'
    },
    {
        Name: 'Back-to-Back',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl', 'Melee'],
        Text: "<p>While engaged with one or more allies, your character and allies they are engaged with add <span class='dice boost'>b</span> to combat checks. If one or more allies engaged with your character also have Back-to-Back, the effects are cumulative to a maximum of <span class='dice boost'>bb</span>.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Blood Magic (Improved)',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p><em>Your character must have purchased the Blood Magic talent to benefit from this talent.</em></p><p>Once per encounter, suffer an additional 2 wounds while using Blood Magic and add one additional effect with a Difficulty Mod +<span class='dice difficulty'>d</span> to a spell without increasing the difficulty.</p>",
        Source: 'CCC-ESP77'
    },
    {
        Name: 'Body Guard (Improved)',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p><em>Your character must have purchased the Body Guard talent to benefit from this talent.</em></p><p>Once per session, when an ally protected by the Body Guard maneuver suffers a hit, suffer the hit instead.</p>",
        Source: 'LBE, FIB, EBGR, FCRB'
    },
    {
        Name: 'Brilliant Evasion',
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>Once per vehicle encounter, your character may take Brilliant Evasion action. Select 1 opponent and make Opposed Piloting check to stop opponent from attacking character for rounds equal to Agility.</p>",
        Source: 'ACRB, ECRB'
    },
    {
        Name: 'By the Book',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Combat'],
        Text: "<p>Once per encounter, before making a combat check, suffer 2 strain to add <span class='genesys'>a</span> to the results equal to ranks in By the Book.</p>",
        Source: 'DOR'
    },
    {
        Name: "Can't We Talk About This?",
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Leader', 'Social'],
        Text: "<p>Your character can use this talent to make an <strong>opposed Charm</strong> or <strong>Deception versus Discipline check</strong> targeting a single non-nemesis adversary within medium range. If the check succeeds, the target cannot attack your character (or perform hostile actions against your character) until the end of their next turn. You may spend <span class='genesys'>aa</span> to increase the length of the effect by one additional turn, and spend <span class='genesys'>t</span> to extend the benefits to all of their identified allies within short range. The effect ends immediately if your character or a known ally attacks the target. In addition, your GM may rule that some targets are immune to this ability. An automated sentry turret, for example, has no interest in resolving a conflict through talking, nor would someone consumed by rage and the desire for revenge against your character.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Careful Planning',
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Adventurer', 'Knowledge'],
        Text: "<p>Once per session, may introduce a 'fact' into the narrative as if a Story Point had been spent.</p>",
        Source: 'ACRB, KTP'
    },
    {
        Name: 'Center of Being (Improved)',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Melee', 'Tough'],
        Text: "<p>Spend 1 Strain to use a Center of Being maneuver as an incidental.</p>",
        Source: 'FCRB'
    },
    {
        Name: 'Commanding Presence',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Once per session, may take Commanding Presence action; make an <strong>opposed Cool vs. Discipline check</strong> to force target to leave the encounter.</p>",
        Source: 'LBE'
    },
    {
        Name: 'Comrades in Arms',
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Leader', 'Tough'],
        Text: "<p>Once per encounter, make a <strong>Hard (<span class='genesys'>ddd</span>) Discipline check</strong>. If successful, your character plus one ally per <span class='genesys'>s</span> within medium range gains +1 defense for the remainder of the encounter. Effects end if affected targets move beyond medium range.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Conduit',
        Tier: 4,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p>Once per encounter, your character may spend a Story Point to perform a magic action as a maneuver.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Deadeye',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Range'],
        Text: "<p>After your character inflicts a Critical Injury with a ranged weapon and rolls the result, your character may suffer 2 strain to use this talent. Then, you may select any Critical Injury of the same severity to apply to the target instead.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Death Rage',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl', 'Melee'],
        Text: "<p>Your character adds +2 damage to melee attacks for each Critical Injury they are currently suffering. (Your GM may also impost additional penalties on social skill checks your character makes if they are suffering Critical Injuries due to their frenzied behavior.)</p>",
        Source: 'ROT'
    },
    {
        Name: 'Defensive',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>Each rank of Defensive increases your character's melee defense and ranged defense by one.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Defensive Driving',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Vehicles'],
        Text: "<p>Increase the defense of any vehicle your character pilots by one per rank of Defensive Driving.</p><p>The specifics of this talent require the optional vehicle rules, on page 220. If your game does not use these rules, this talent adds <span class='dice boost'>b</span> per rank to combat checks targeting your character's vehicle or your character while piloting it.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Deflection',
        Tier: 4,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Athleticism', 'Melee', 'Tough'],
        Text: "<p><em>Your character must have purchased the Reflect talent to benefit from this talent.</em></p><p>After using Reflect, may spend 1 Story Point to perform Move maneuver as out-of-turn incidental to close distance with or engage opponent.</p>",
        Source: 'FCRB'
    },
    {
        Name: 'Distracting Behavior (Improved)',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p><em>Your character must have purchased the Distracting Behavior talent to benefit from this talent.</em></p><p>The Distracting Behavior maneuver inflicts <span class='genesys'>hh</span> on NPC's checks when NPCs target your character's allies.</p>",
        Source: 'FH'
    },
    {
        Name: "Don't Shoot!",
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Once per session as an action, make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Charm check</strong>. On a success, cannot be target of combat checks until the end of the encounter or until making threatening actions.</p>",
        Source: 'FC'
    },
    {
        Name: 'Enduring',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>Each rank of Enduring increases your character's soak value by one.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Field Commander (Improved)',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Leader', 'Social'],
        Text: "<p><em>Your character must have purchased the Field Commander talent to benefit from this talent.</em></p><p>When your character uses the Field Commander talent, your character affects a number of allies equal to twice the character's Presence. In addition, you may spend <span class='genesys'>t</span> to allow one ally to suffer 1 strain to perform an action, instead of a maneuver.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Formation Tactics (Improved)',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Leader'],
        Text: "<p><em>Your character must have purchased the Formation Tactics talent to benefit from this talent.</em></p><p>The difficulty of taking the Formation Tactics action is reduced to <strong>Average (<span class='dice difficulty'>dd</span>)</strong> instead of <strong>Hard (<span class='dice difficulty'>ddd</span>)</strong>. Your character may also spend <span class='genesys'>t</span> or <span class='genesys'>aaaaaa</span> to have the effect last until the end of the encounter.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Full Throttle (Improved)',
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p><em>Your character must have purchased the Full Throttle talent to benefit from this talent.</em></p><p>Suffer 1 strain to attempt Full Throttle as a maneuver and decrease its difficulty to <strong>Average (<span class='dice difficulty'>dd</span>)</strong>.</p>",
        Source: 'ABGR, ACRB, EBGR, ECRB, EV'
    },
    {
        Name: 'Holistic Navigation',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Knowledge'],
        Text: "<p>When making a Navigation skill check, your character may spend one Story Point to remove <span class='genesys'>d</span>, or to remove <span class='genesys'>h</span> equal to their ranks in Perception.</p>",
        Source: 'SS'
    },
    {
        Name: 'How Convenient!',
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Mechanics'],
        Text: "<p>Once per session, your character may use this talent to make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Mechanics check</strong>. If successful, one device involved in the current encounter (subject to your GM's approval) spontaneously fails. This can be because of your character's actions, or it can simply be incredibly convenient timing!</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Inspiring Rhetoric (Supreme)',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Leader', 'Social'],
        Text: "<p><em>Your character must have purchased the Inspiring Rhetoric talent to benefit from this talent.</em></p><p>Your character may choose to suffer 1 strain to use the Inspiring Rhetoric talent as a maneuver, instead of as an action.</p>",
        Source: 'GCRB'
    },
    {
        Name: "It's Not that Bad",
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Leader', 'Medicine'],
        Text: "<p>Once per session when an ally would suffer a Critical Injury, your character may take an It's Not That Bad action and make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Medicine check</strong> to stop the ally from gaining the Critical Injury.</p>",
        Source: 'ACRB'
    },
    {
        Name: 'Jury Rigged',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Adventurer', 'Knowledge', 'Mechanics'],
        Text: "<p>Your character may choose one personal weapon or piece of armor per rank of Jury Rigged. They may increase the damage of the weapon by one; decrease the a cost on its Critical, or any single other effect by one to a minimum of one; or increase armor's ranged or melee defense by one. Alternatively, they can decrease the encumbrance of the item by two to a minimum of one. The bonus only applies so long as your character is using the item. If the item is ever lost or destroyed, your character may apply Jury Rigged to a new personal weapon or piece or armor.</p>",
        Source: 'ACRB, EBGR, ECRB'
    },
    {
        Name: 'Moving Target',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Athleticism', 'Awareness'],
        Text: "<p>If your character has already acted this round, increase their ranged Defense by 1 per rank of Moving Target.</p>",
        Source: 'FIB'
    },
    {
        Name: 'Offensive Driving',
        Tier: 4,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>As a maneuver, your character may inflict a number of system strain on their vehicle no greater than its highest defense value and choose a vehicle within close range. If the character does so, upgrade the difficulty of the next Piloting check that vehicle's pilot makes before the end of the encounter once for each system strain inflicted on your character's vehicle this way.</p>",
        Source: 'ND'
    },
    {
        Name: 'Overbalance',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Brawl', 'Melee'],
        Text: "<p>Whenever an enemy engaged with your character makes a combat check, after the attack is resolved, your character may spend <span class='genesys'>d</span> or <span class='genesys'>hhh</span> to stagger the attacker until the end of the attacker's next turn.</p>",
        Source: 'ND, KTP'
    },
    {
        Name: 'Overcharge',
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Cyber', 'Mechanics', 'Tough'],
        Text: "<p>Once per encounter, your character may use this talent to make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Mechanics check</strong> and choose one of their cybernetic implants that grants them one of the following: +1 to a characteristic rating, +1 rank to a skill, +1 rank of a ranked talent. If your character succeeds, until the end of the encounter, the chosen cybernetic instead provides +2 to the affected characteristic rating (to a maximum of 7), skill (to a maximum of 5), or ranked talent. Your GM may spend <span class='genesys'>d</span> or <span class='genesys'>hhh</span> from the check to have the overcharged cybernetic short out at the end of the encounter; it provides no benefit until your character spends several hours making an <strong>Average (<span class='dice difficulty'>dd</span>) Mechanics check</strong> to repair it.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Precise Aim',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Combat'],
        Text: "<p>Once per round on your character's turn, when they perform an Aim maneuver before attempting a combat check, they may suffer a number of strain not exceeding their ranks in Precise Aim. They then decrease the target's defense (ranged and melee) by one per strain suffered for that combat check.</p>",
        Source: 'EBGR, ECRB, SS'
    },
    {
        Name: 'Prey on the Weak',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Combat', 'Skulduggery'],
        Text: "<p>Add +1 damage to one hit of successful combat checks against disoriented targets per rank of Prey on the Weak.</p>",
        Source: 'FIB, FCRB'
    },
    {
        Name: 'Prime Positions',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Athleticism', 'Tough'],
        Text: "<p>When your character or an ally in short range takes cover, they increase their soak against ranged attacks by 1 per rank of Prime Positions until they leave that cover.</p>",
        Source: 'FIB, KTP'
    },
    {
        Name: 'Programmer Dialect (Improved)',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Computers','Mechanics','Social'],
        Text: "<p><em>Your character must have purchased the Programmer Dialect talent to benefit from this talent.</em></p><p>When directing robots and V.I.s, those NPCs get an additional <span class='dice boost'>b</span> in addition to other benefits.</p>",
        Source: 'SM – Speaks Binary'
    },
    {
        Name: 'Prophetic Aim',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Awareness', 'Range'],
        Text: "<p>While benefiting from an Aim maneuver, <span class='genesys'>d</span> from the character's Range checks cannot cause attacks to hit allies engaged with the target.</p>",
        Source: 'KTP'
    },
    {
        Name: 'Psychic Balm',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Magic'],
        Text: "<p>After making a skill check to cast a Heal spell, may choose to change one <span class='genesys'>s</span> to <span class='genesys'>a</span> per rank of Psychic Balm.</p>",
        Source: 'CCC-TheSapient – Faith Healing'
    },
    {
        Name: "Push the Specs",
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Knowledge', 'Vehicles'],
        Text:"<p>Your character may perform the Push the Specs action when in a ship or vehicle, attempting an <strong>Average (<span class='dice difficulty'>dd</span>) Science check</strong>. If your character is successful, the ship's top speed increases by one for a number of rounds equal to their Intellect. May spend <span class='genesys'>a</span> and have the ship suffer two system strain to extend this effect for an additional round, and may do so multiple times. The ship still cannot perform actions or maneuvers it couldn't perform normally.</p>",
        Source: 'FO',
    },
    {
        Name: 'Rain of Death',
        Tier: 4,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Range'],
        Text: "<p>Perform the Rain of Death maneuver to ignore the increased difficulty due to the Auto-fire quality of attacks made this turn.</p>",
        Source: 'FIB, DC'
    },
    {
        Name: "Reflect (Supreme)",
        Tier: 4,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Melee', 'Tough'],
        Text: "<p><em>Your character must have purchased the Reflect Talent to benefit from this talent.</em></p><p>If your character did not make a combat check during their previous turn, they suffer 1 strain when taking the Reflect incidental instead of 3.</p>",
        Source: 'FCRB'
    },
    {
        Name: 'Reroute Processors',
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Computers'],
        Text: "<p>Once per encounter, may take a Reroute Processors action, make an <strong>Average (<span class='dice difficulty'>dd</span>) Computers check</strong> to reduce one of an artificial life form's characteristics by 1 and increase another of its characteristics by 1.</p>",
        Source: 'SM'
    },
    {
        Name: 'Resolve',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Tough'],
        Text: "<p>When your character involuntarily suffers strain, they suffer 1 less strain per rank of Resolve to a minimum of 1.</p>",
        Source: 'ABGR, ACRB, EBGR, ECRB'
    },
    {
        Name: 'Savvy Negotiator',
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>While engaged in a debate or argument, make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Negotiation check</strong>. If successful, a number of bystanders or observers equal to your Presence sees one of the opponent's points (chosen by your character) as maliciously unreasonable.</p><p>The GM has the final say as to whether bystanders could see a point as unreasonable, based on who those bystanders are and what the point is. In these cases, the GM can suggest a modified version of that argument that would be more believable.</p>",
        Source: 'DOH'
    },
    {
        Name: 'Scathing Tirade (Supreme)',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p><em>Your character must have purchased the Scathing Tirade talent to benefit from this talent.</em></p><p>Your character may choose to suffer 1 strain to use the Scathing Tirade talent as a maneuver, instead of as an action.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Second Chances',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Adventurer'],
        Text: "<p>Once per encounter choose a number of positive dice equal to ranks in Second Chances and reroll them.</p>",
        Source: 'SOT, FC'
    },
    {
        Name: 'Seen a Lot of Things',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Knowledge'],
        Text: "<p>Whenever your character fails a Knowledge check, they may spend '<span class='genesys'>aaa</span> to roll the check again during their next turn.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Signature Spell (Improved)',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Magic'],
        Text: "<p><em>Your character must have purchased the Signature Spell talent to benefit from this talent.When your character casts their signature spell, reduce the difficulty of the check by two instead of one.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Skilled Slicer',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Computers'],
        Text: "<p>When making a Computers check may spend a <span class='genesys'>t</span> to make further Computers checks within this system as maneuvers.</p>",
        Source: 'ACRB, ECRB'
    },
    {
        Name: 'Sorry About the Mess',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Combat', 'Skulduggery'],
        Text: "<p>Decrease the Critical Rating of a weapon by 1 (to a minimum of 1) against targets that have not yet acted this encounter.</p>",
        Source: 'FC'
    },
    {
        Name: 'Spitfire',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Range'],
        Text: ",p>After a successful combined check with two light Ranged weapons, additional hits can be allocated to other targets within range of the weapons.</p>",
        Source: 'FC'
    },
    {
        Name: 'Steady Aim',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Range'],
        Text: "<p>Your character does not lose the benefits of the aim maneuver if they perform other maneuvers (including moving) or actions. Your character does lose the benefits of the aim maneuver if the encounter ends.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Supporting Evidence',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Leader', 'Social'],
        Text: "<p>When assisting an ally with a Charm, Deception, Leadership, or Negotiation check, add an automatic <span class='genesys'>a</span> per rank of Supporting Evidence.</p>",
        Source: 'DA'
    },
    {
        Name: 'Targeted Firepower',
        Tier: 4,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Awareness', 'Knowledge'],
        Text: "<p>Once per session, identify one enemy target and make an appropriate <strong>Hard (<span class='dice difficulty'>ddd</span>) Science</strong> or <strong>Lore check</strong> (GM chooses). If successful, for the rest of the encounter, allies within short range of your character add <span class='genesys'>a</span> to attacks against the target equal to <span class='genesys'>s</span> generated on the check.</p>",
        Source: 'DOR'
    },
    {
        Name: "That's How It's Done",
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'Yes',
        Tags: ['Leader'],
        Text: "<p>Upon a successful skill check, your character may suffer 1 strain. If they do so, a number of allies within short range equal to your character's Willpower add an automatic <span class='genesys'>a</span> when making the same skill check until the start of your character's next turn. The range at which That's How It's Done can affect allies increases by one band per rank of That's How It's Done.</p>",
        Source: 'LBE'
    },
    {
        Name: 'Trust No One',
        Tier: 4,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>When your character is targeted by a social check, they may suffer 1 strain to add automatic <span class='genesys'>f</span> to the check. If the check fails with <span class='genesys'>d</span>, your character may immediately perform a maneuver as an out-of-turn incidental.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Unrelenting',
        Tier: 4,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Brawl', 'Melee'],
        Text: "<p>Once per round after resolving a successful Brawl or Melee combat check, your character may suffer 4 strain to use this talent to make an additional melee attack as an incidental against the same target. Increase the difficulty of the combat check by one if this attack uses a second weapon, or by two if the attack uses the same weapon.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Venom Soaked Blade',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Melee', 'Skulduggery'],
        Text: "<p>When making a Melee combat check using a light poisoned weapon, your character treats it as possessing the Burn 2 item quality.</p>",
        Source: 'ROT'

    },
    {
        Name: 'Unrelenting Skeptic',
        Tier: 4,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Awareness', 'Social'],
        Text: "<p>When targeted by a Deception check, the character automatically adds <span class='genesys'>f</span> to the check equal to ranks in Vigilance.</p>",
        Source: 'FH, EV'
    },
    /* TIER 5 */
    {
        Name: 'Altered Deal',
        Tier: 5,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Once per session, make a #[strong Hard (#[span.dice.difficulty ddd]) Coercion check] to radically change a previously made deal or bargain to your character's advantage.</p>",
        Source: 'DOR'
    },
    {
        Name: "Armor Master (Supreme)",
        Tier: 5,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p><em>Your character must have purchased the Armor Master talent to benefit from this talent.</em></p><p>Once per round, when your character suffers a Critical Injury, they may suffer 3 strain to take the Armor Master incidental. If they do, they reduce the Critical Injury result that they suffer by 10 per point of their soak, to a minimum of 1.</p>",
        Source: 'KTP',
    },
    {
        Name: 'Baleful Gaze',
        Tier: 5,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Social', 'Tough'],
        Text: "<p>When targeted by combat check from within medium range, may spend a Story Point to upgrade the difficulty of the check a number of times equal to ranks in Coercion.</p>",
        Source: 'KTP'
    },
    {
        Name: "Body Guard (Supreme)",
        Tier: 5,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p><em>Your character must have purchased the Body Guard talent to benefit from this talent.</em></p><p>The Body Guard maneuver may protect a number of engaged characters up to ranks in Resilience.</p>",
        Source: 'FIB'
    },
    {
        Name: "Comrades in Arms (Improved)",
        Tier: 5,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Leader'],
        Text: "<p>Your character must have purchased the Comrades in Arms talent to benefit from this talent.</em></p><p>Spend <span class='genesys'>aaa</span> or <span class='genesys'>t</span> when performing Comrades in Arms to also gain +1 soak or give one affected ally +1 soak.</p>",
        Source: 'DOR'
    },
    {
        Name: "Coordination Dodge",
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Athleticism', 'Tough'],
        Text: "<p>When targeted by a combat check, your character may spend 1 Story Point to add <span class='genesys'>f</span> equal to their ranks in Coordination to the check.</p>",
        Source: 'FH, ND'
    },
    {
        Name: 'Crucial Point',
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Once per session, your character may introduce to negotiations one potential concession that an opponent will do nearly anything to obtain.</p>",
        Source: 'DOH'
    },
    {
        Name: 'Crushing Blow',
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Brawl', 'Melee'],
        Text: "<p>Once per session after rolling a melee attack but before resolving the check, your character may suffer 4 strain to use this talent. While resolving the check, the weapon gains the Breach 1 and Knockdown item qualities, and destroys one item the target is wielding that does not have the Reinforced quality.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Dedication',
        Tier: 5,
        Activation: 'Passive',
        Ranked: 'Yes',
        Tags: ['Adventurer'],
        Text: "<p>Each rank of Dedication increases one of your character's characteristics by one. This talent cannot increase a characteristic above 5. You cannot increase the same characteristic with Dedication twice.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Full Throttle (Supreme)',
        Tier: 5,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p><em>Your character must have purchased the Full Throttle talent to benefit from this talent.</em></p><p>When performing Full Throttle, top speed increases by 2 instead of 1.</p>",
        Sources: 'ACRB, ECRB, EV'
    },
    {
        Name: 'Heavy Hitter',
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Range', 'Vehicles'],
        Text: "<p>Once per session, spend <span class='genesys'>t</span> on a successful Ranged (with a heavy weapon) or Gunnery check to add the Breach 1 quality to the attack, or increase an existing Breach rating by 1.</p>",
        Sources: 'FIB, DC'
    },
    {
        Name: 'Indomitable',
        Tier: 5,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Tough'],
        Text: "<p>Once per encounter, when your character would be incapacitated due to exceeding their wound or strain threshold, you may spend a Story Point to use this talent. Then, your character is not incapacitated until the end of their next turn. If your character reduces their strain or wounds to below their threshold before the end of their next turn, they are not incapacitated.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Inspiring Leadership',
        Tier: 5,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Leader'],
        Text: "<p>Make a <strong>Hard (<span class='dice difficulty'>ddd</span>) Leadership check</strong>. If successful, a number of allies not exceeding your character's Presence within short range add <span class='genesys'>s</span> to their next skill check.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Intense Focus',
        Tier: 5,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Adventurer'],
        Text: "<p>Your character may perform an Intense Focus maneuver; they suffer 1 strain and upgrade the ability of their next skill check by one.</span>",
        Sources: 'ABGR, ACRB, ECRB, DOH'
    },
    {
        Name: 'Just Kidding!',
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Once per round as an incidental spend 1 Story Point to ignore a <span class='genesys'>d</span> generated on a social check by the character or any ally in short range.</p>",
        Source: 'FC'
    },
    {
        Name: 'Master',
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Adventurer', 'Knowledge'],
        Text: "<p>When you purchase this talent for your character, choose one skill. Once per round, your character may suffer 2 strain to use this talent to reduce the difficulty of the next check they make using that skill by two, to a minimum of <strong>Easy (<span class='dice difficulty'>d</span>)</strong>.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Master Demolitionist',
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Adventurer', 'Combat', 'Mechanics'],
        Text: "<p>When resolving an attack from a personal scale explosive or ordinance weapon, your character may spend <span class='genesys'>a</span> or <span class='genesys'>t</span> to have the weapon's Blast quality affect all characters within short range (rather than engaged). If the weapon normally affects all characters within short range, then the range of the effect is increased to medium range instead. You must still activate the Blast quality.</p>",
        Source: 'FO'
    },
    {
        Name: 'Master Pilot',
        Tier: 5,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>Once per round when driving, piloting, or operating a vehicle, may suffer 2 strain to perform any action as a maneuver.</p>",
        Sources: 'ACRB, ETU, ECRB'
    },
    {
        Name: 'Master Grenadier',
        Tier: 5,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Adventurer', 'Combat', 'Mechanics'],
        Text: "<p>Decrease the a cost to activate the Blast quality on any attack by 1 to a minimum of 1.</p>",
        Sources: 'ACRB, DC'
    },
    {
        Name: 'Master Leader',
        Tier: 5,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Leader'],
        Text: "<p>Once per round, suffer 2 strain to allow an ally within short range to count as having the same number of ranks in Discipline as your character for the next Discipline check the ally makes.</p>",
        Source: 'DOH – Master Instructor'
    },
    {
        Name: 'Most Impressive',
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Leader', 'Social'],
        Text: "<p>Spend <span class='genesys'>t</span> from any skill check to allow a number of allies not exceeding your character's Presence within short range add <span class='genesys'>a</span> to their next check.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Overcharge (Improved)',
        Tier: 5,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Athleticism', 'Cyber', 'Mechanics'],
        Text: "<p><em>Your character must have purchased the Overcharge talent to benefit from this talent.</em></p><p>When using the Overcharge talent, your character may spend <span class='genesys'>aa</span> or <span class='genesys'>t</span> from the Mechanics check to immediately take one additional action. This talent can only be used once per check.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Prepare to be Boarded',
        Tier: 5,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Social', 'Vehicles'],
        Text: "<p>Once per encounter, make an <strong>opposed Coercion vs Discipline check</strong> against an enemy ship captain. If successful, the enemy suffers 1 strain per <span class='genesys'>s</span> and surrenders their ship if they exceed their strain threshold. Spend <span class='genesys'>t</span> or <span class='genesys'>aaaa</span> to inflict strain equal to your character's ranks in Coercion.</p>",
        Source: 'DOR'
    },
    {
        Name: 'Programmer Dialect (Supreme)',
        Tier: 5,
        Activation: 'Active (Maneuver)',
        Ranked: 'No',
        Tags: ['Computers'],
        Text: "<p>Once per encounter, may perform the Programmer Dialect maneuver. A number of robots or V.I.s up to ranks in Programmer Dialect may use your character's ranks for 1 skill of your character's choice.</p>",
        Source: 'SM - Speaks Binary'
    },
    {
        Name: 'Retribution',
        Tier: 5,
        Activation: 'Active (Incidental, Out of Turn)',
        Ranked: 'No',
        Tags: ['Melee', 'Range'],
        Text: "<p>Once per round when an adversary attacks an ally within medium range, your character may spend one Story Point to use this talent to automatically hit that enemy once with a weapon your character is wielding, if the enemy is within the weapon's range. The hit deals the weapon's base damage, plus any damage from applicable talents or abilities.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Ruinous Repartee',
        Tier: 5,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Social'],
        Text: "<p>Once per encounter, your character may use this talent to make an <strong>opposed Charm or Coercion versus Discipline check</strong> targeting one character within medium range (or within earshot). If successful, the target suffers strain equal to twice your character's Presence, plus one additional strain per <span class='genesys'>s</span>. Your character heals strain equal to the strain inflicted. If incapacitated due to this talent, the target could flee the scene in shame, collapse in a dejected heap, or throw themself at your character in fury, depending on your GM and the nature of your character's witty barbs.</p>",
        Source: 'GCRB'
    },
    {
        Name: 'Superhuman Reflexes',
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Vehicles'],
        Text: "<p>Once per session, after generating <span class='genesys'>d</span> on a Piloting check cancel the <span class='genesys'>d</span> and add <span class='genesys'>s</span> equal to ranks in Cool.<p>",
        Source: 'EV'
    },
    {
        Name: 'Thorough Assessment',
        Tier: 5,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Knowledge'],
        Text: "<p>Once per session, take a Thorough Assessment action: make an appropriate <strong>Hard (<span class='dice difficulty'>ddd</span>) Knowledge check</strong> to gain <span class='dice boost'>b</span> equal to <span class='genesys'>s</span> that can be distributed during the encounter.</p>",
        Sources: 'DA, LBE'
    },
    {
        Name: 'Unrelenting Skeptic (Improved)',
        Tier: 5,
        Activation: 'Active (Incidental)',
        Ranked: 'No',
        Tags: ['Awareness', 'Social'],
        Text: "<p><em>Your character must have purchased the Unrelenting Skeptic talent to benefit from this talent.</em></p><p>When targeted by a Deception check that fails, may spend 1 Story Point to add <span class='genesys'>d</span> to results.</p>",
        Source: 'FH'
    },
    {
        Name: 'Whirlwind',
        Tier: 5,
        Activation: 'Active (Action)',
        Ranked: 'No',
        Tags: ['Brawl', 'Melee'],
        Text: "<p>Your character may suffer 4 strain to use this talent to make a Brawl or Melee attack against the engaged adversary who is hardest to hit (as determined by the GM), increasing the difficulty by one. If the combat check succeeds, each adversary engaged with the character suffers one hit from the attack. The attack deals base damage plus damage equal to the total <span class='genesys'>s</span> scored on the check.</p>",
        Source: 'ROT'
    },
    {
        Name: 'Zealous Fire',
        Tier: 5,
        Activation: 'Passive',
        Ranked: 'No',
        Tags: ['Adventurer', 'Tough'],
        Text: "<p>Each time your Game Master spends a Story Point, your character heals 2 strain.</p>",
        Source: 'ROT'
    }
]
