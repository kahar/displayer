setTimeout(() => {
    /*moves part*/
    $.getJSON("https://raw.githubusercontent.com/kahar/displayer/main/moves.json")
        .done(function (data) {

            var moves = data.Moves;
            var movesTypes = [];
            for (var i = 0; i < moves.length; i++) {
                var move = moves[i];
                if (movesTypes[move.Category] != null) {
                    movesTypes[move.Category].push(move);
                } else {
                    movesTypes[move.Category] = [];
                    movesTypes[move.Category].push(move);
                }
            }

            for (const category in movesTypes) {
                var moveType = movesTypes[category];
                var divToAppend = '<div id="' + toId(category) + '" ><div onclick="hideSubElements(this)">' + converter.makeHtml('##' + category) + '</div><div id="subelements"></div></div>'
                $("#moves_I_list").append(divToAppend);
                for (var i = 0; i < moveType.length; i++) {
                    var move = moveType[i];
                    var liToAppend = '<div id=' + toId(move.Name) + '>' + converter.makeHtml('###' + move.Name + '\n' + move.Text) + '</div>';

                    $("#" + toId(category) + " #subelements").append(liToAppend);
                }
            }
        });

    /*assets part*/
    $.getJSON("https://raw.githubusercontent.com/kahar/displayer/main/assets.json")
        .done(function (data) {
            var assets = data.Assets;
            var assetsTypes = [];
            for (var i = 0; i < assets.length; i++) {
                var asset = assets[i];
                if (assetsTypes[asset.Category] != null) {
                    assetsTypes[asset.Category].push(asset);
                } else {
                    assetsTypes[asset.Category] = [];
                    assetsTypes[asset.Category].push(asset);
                }
            }

            for (const category in assetsTypes) {
                var assetType = assetsTypes[category];
                var divToAppend = '<div id="' + toId(category) + '" ><div onclick="hideSubElements(this)">' + converter.makeHtml('##' + category) + '</div><div id="subelements"></div></div>'
                $("#assets_I_list").append(divToAppend);
                for (var i = 0; i < assetType.length; i++) {
                    var asset = assetType[i];

                    var liToAppend = '<div id=' + toId(asset.Name) + '>' + converter.makeHtml('###' + asset.Name +
                            (asset.Description != null ? ('\n' + asset.Description + '\n') : '\n')) +
                        '<div>' +
                        '<input type="checkbox" disabled ' + (asset.Abilities[0].Enabled == true ? 'checked' : '') + '>' + converter.makeHtml(asset.Abilities[0].Text) +
                        '<input type="checkbox" disabled ' + (asset.Abilities[1].Enabled == true ? 'checked' : '') + '>' + converter.makeHtml(asset.Abilities[1].Text) +
                        '<input type="checkbox" disabled ' + (asset.Abilities[2].Enabled == true ? 'checked' : '') + '>' + converter.makeHtml(asset.Abilities[2].Text) +
                        '</div>' +
                        '</div>';

                    $("#" + toId(category) + " #subelements").append(liToAppend);
                }
            }
        });

    /*oracles part*/
    $.getJSON("https://raw.githubusercontent.com/kahar/displayer/main/oracles.json")
        .done(function (data) {
            for (var k in data) oraclesI[k] = data[k];
            for (var i = 0; i < data.length; i++) {
                var oracle = data[i];
                oraclesI[spaceToUnderscore(getNameOrDisplayName(oracle))] = oracle;
                if (oracle["Display name"] == null) {
                    oracle["Display name"] = oracle.Name;
                }
                var divToAppend = '<div id="' + toId(oracle["Display name"]) + '" ><div onclick="hideSubElements(this)">' + converter.makeHtml('##' + oracle["Display name"]) + '</div><div id="subelements"></div></div>'
                $("#oracles_I_list").append(divToAppend);
                for (var j = 0; j < oracle.Oracles.length; j++) {
                    var subOracle = oracle.Oracles[j];
                    parseSubOracle(oracle, subOracle);
                }
                if (oracle.Subcategories != null) {
                    for (var z = 0; z < oracle.Subcategories.length; z++) {
                        var subOracle = oracle.Subcategories[z];
                        parseSubOracle(oracle, subOracle);
                    }
                }
            }
        });

}, 1000);


function createCallIMH(display) {
    var txt = "Potwór: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Heed_the_Call.What_has_the_monster_done) +
        "<br>" +
        "a ludzie: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Heed_the_Call.How_have_they_tried_to_stop_it) +
        "<br>" +
        "i teraz ci ludzie: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Heed_the_Call.What_is_their_dominant_attitude)
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function createTrackIMH(display) {
    var txt = "Ślady: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Search_for_Tracks_or_Location_Sign.Sign) +
        "<br>" +
        "wiek: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Search_for_Tracks_or_Location_Sign.Age)
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function createMonsterClueIMH(display) {
    var txt = "Wskazówka co do potworów " +
        "<br>" +
        "Wskazówka 1: " + rollOnOracleI(oraclesI.Prompt_Oracles.Event) +
        "<br>" +
        ">Wskazówka 2: " + rollOnOracleI(oraclesI.Prompt_Oracles.Component) +
        "<br>" +
        ">Wskazówka 3: " + rollOnOracleI(oraclesI.Prompt_Oracles.Method) +
        "<br>" +
        ">Wskazówka 4: " + rollOnOracleI(oraclesI.Prompt_Oracles.Target) +
        "<br>" +
        ">Wskazówka 5: " + rollOnOracleI(oraclesI.Prompt_Oracles.Aspect) + " " + rollOnOracleI(oraclesI.Prompt_Oracles.Focus) +
        "<br>" +
        " Problematyczny potwór otrzymuje 1 i 2 od razu, ogromny potwór otrzymuje 3 i 4 przy 3 wskazówce"
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function uncoverSecretIMH(display) {
    var txt = "Kto: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Uncover_a_Secret.Actor) +
        "<br>" +
        "sekretnie: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Uncover_a_Secret.Secretly_Does) +
        "<br>" +
        "dlaczego: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Uncover_a_Secret.Why)
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function findOpposingViewpointIMH(display) {
    var txt = "Kto: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Find_an_Opposing_Viewpoint.Actor) +
        "<br>" +
        "chce: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Find_an_Opposing_Viewpoint.Want) +
        "<br>" +
        "z powodu: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Find_an_Opposing_Viewpoint.Why)
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function findMonsterMotivationIncitingConflictAndMountingPressureIMH(display) {
    var txt = "Potwór chce: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Background.Monster_wants_to) +
        "<br>" +
        "ale: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Background.But) +
        "<br>" +
        "i jest gorzej ponieważ: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_Background.And_it_is_getting_worse_because)
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function createPremiseIMV(display) {
    var txt = "Przesłanka: " + rollOnOracleI(oraclesI.Ironsmith_MYSTERY_VOWS.Premise)
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function createItemOfNarrativeSignificanceIMV(display) {
    var result = Math.floor(Math.random() * 2) + 1;
    var txt = "Przedmiot: "
    if (result == 1) {
        txt = txt + rollOnOracleI(oraclesI.Ironsmith_MYSTERY_VOWS.Item_of_Narrative_Significance_Part_1);
    } else {
        txt = txt + rollOnOracleI(oraclesI.Ironsmith_MYSTERY_VOWS.Item_of_Narrative_Significance_Part_2);
    }
    txt = txt +
        "<br>" +
        "Wskazówka dotyczy:" + rollOnOracleI(oraclesI.Ironsmith_MYSTERY_VOWS.Clue_Relates_to)

    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function createInformationIMV(display) {
    var txt = "Typ informacji: " + rollOnOracleI(oraclesI.Ironsmith_MYSTERY_VOWS.Type_of_Info) +
        "<br>" +
        "Temat informacji: " + rollOnOracleI(oraclesI.Ironsmith_MYSTERY_VOWS.Topic_of_Info) +
        "<br>" +
        "Wskazówka dotyczy:" + rollOnOracleI(oraclesI.Ironsmith_MYSTERY_VOWS.Clue_Relates_to)
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function createObstacleIMV(display) {
    var txt = "Przeszkoda: " + rollOnOracleI(oraclesI.Ironsmith_MYSTERY_VOWS.Obstacle)
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}

function confrontationWithMonsterIMH() {
    var result = "";
    var random = Math.floor(Math.random() * 6) + 1;
    if (random <= 2) {
        result = result + "Rozmiar się zgadza:" + (Math.floor(Math.random() * 100) + 1 <= 25 ? "nie" : "tak");
    } else {
        result = result + "Rozmiar się zgadza:" + (Math.floor(Math.random() * 100) + 1 <= 10 ? "nie" : "tak");
    }
    result = result + " jeżeli nie to potwór jest:" + (Math.floor(Math.random() * 100) + 1 <= 50 ? "wiekszy" : "mniejszy");
    random = Math.floor(Math.random() * 6) + 1;
    if (random <= 2) {
        result = result + " Ogólna postać się zgadza:" + (Math.floor(Math.random() * 100) + 1 <= 25 ? "nie" : "tak");
    } else {
        result = result + " Ogólna postać się zgadza:" + (Math.floor(Math.random() * 100) + 1 <= 10 ? "nie" : "tak");
    }
    random = Math.floor(Math.random() * 6) + 1;
    if (random == 1) {
        result = result + " Cechy charakterystyczne się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 90 ? "nie" : "tak");
    } else if (random == 2) {
        result = result + " Cechy charakterystyczne się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 75 ? "nie" : "tak");
    } else if (random == 3) {
        result = result + " Cechy charakterystyczne się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 50 ? "nie" : "tak");
    } else if (random == 4) {
        result = result + " Cechy charakterystyczne się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 25 ? "nie" : "tak");
    } else if (random == 5) {
        result = result + " Cechy charakterystyczne się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 10 ? "nie" : "tak");
    } else if (random == 6) {
        result = result + " Cechy charakterystyczne się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 10 ? "nie" : "tak");
    }
    random = Math.floor(Math.random() * 6) + 1;
    if (random == 1) {
        result = result + " Umiejętności się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 90 ? "nie" : "tak");
    } else if (random == 2) {
        result = result + " Umiejętności się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 75 ? "nie" : "tak");
    } else if (random == 3) {
        result = result + " Umiejętności się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 50 ? "nie" : "tak");
    } else if (random == 4) {
        result = result + " Umiejętności się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 25 ? "nie" : "tak");
    } else if (random == 5) {
        result = result + " Umiejętności się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 10 ? "nie" : "tak");
    } else if (random == 6) {
        result = result + " Umiejętności się zgadzają:" + (Math.floor(Math.random() * 100) + 1 <= 10 ? "nie" : "tak");
    }


    return result;
}


function endTheFightWithMonsterIMH(display) {
    var txt = "Silne trafienie: " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_End_Fight.Strong_Hit) +
        " <br>, ale [ tylko przy słabym trafieniu] : " + rollOnOracleI(oraclesI.Ironsmith_Monster_Hunting_End_Fight.Weak_Hit)
    if (display == null || display) {
        displayInModal(txt);
    }
    return txt;
}