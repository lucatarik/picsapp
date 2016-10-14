/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');

        var wprotmem = null;



        lievitismo();

        $("#wprot").keyup(function () {

            wprotmem = null;
            if ($('#wprot').val() == '') {
                $('#wprot').parent().removeClass("errato");
            }

        });

        $(".nowprot").keyup(function () {

            wprotmem = null;
            $('#wprot').val(null);

        });

        $("input[type='radio']").click(function () {

            lievitismo();

        });

        $("input").keyup(function () {

            lievitismo();

        });

        $('input[id]').keydown(function (e) {
            if (e.which === 13) {
                var index = $('input[id]').index(this) + 1;
                var item = $('input[id]').eq(index);
                if (item.is(':visible'))
                    item.focus()[0].scrollIntoView();
                else
                {
                    var elems = $('[role="tab"].ui-state-active').nextAll();
                    if (elems.length)
                    {
                        elems.eq(0).find('a').click();
                    }
                    item.focus()[0].scrollIntoView();
                }
            }
        });
        $.event.special.swipe.scrollSupressionThreshold = 10; // More than this horizontal displacement, and we will suppress scrolling.
$.event.special.swipe.horizontalDistanceThreshold = 30; // Swipe horizontal displacement must be more than this.
$.event.special.swipe.durationThreshold = 500;  // More time than this, and it isn't a swipe.
$.event.special.swipe.verticalDistanceThreshold = 75; // Swipe vertical displacement must be less than this.
        $('div[data-role="page"]').on( "swiperight", function(e)
        {
            if ($(e.target).is('input'))
                return;
            var elems = $('[role="tab"].ui-state-active').prevAll();
            if (elems.length)
            {
                elems.eq(0).find('a').click();
            }
        } ).on( "swipeleft", function(e)
        {
            if ($(e.target).is('input'))
                return;
            var elems = $('[role="tab"].ui-state-active').nextAll();
            if (elems.length)
            {
                elems.eq(0).find('a').click();
            }
        } );        

//            $("input").click(function(){this.setSelectionRange(0, this.value.length)});

        function lievitismo() {

            var errato = 0;

            var wprot = parseFloat(($('#wprot').val()).replace(',', '.'));

            if (wprot && (wprotmem != wprot)) {
                if (isNaN(wprot) || wprot < 9 || (wprot > 15 && wprot < 90) || wprot > 450) {
                    $('#wprot').parent().addClass("errato");
                    errato = 1;
                }
                else {
                    wprotmem = wprot;
                    $('#wprot').parent().removeClass("errato");
                    if (wprot < 30) {
                        var wproteff = 54.5 * wprot - 414.9;
                    } else {
                        var wproteff = wprot;
                    }
                    var idrosugg = (0.189954925949774 * wproteff + 15.6954282034771).toFixed(0);
                    var lievsugg = (0.356777952493277 * Math.exp(0.0127312106416944 * wproteff)).toFixed(0);
                    if (idrosugg < 50) {
                        idrosugg = 50;
                    }
                    if (idrosugg > 100) {
                        idrosugg = 100;
                    }
                    if (lievsugg < 3) {
                        lievsugg = 3;
                    }
                    if (lievsugg > 96) {
                        lievsugg = 96;
                    }
                    $('#idro').val(idrosugg);
                    $('#liev').val(lievsugg);
                }
            }

            var panielli = parseFloat(($('#panielli').val()).replace(',', '.'));

            if (isNaN(panielli) || panielli < 1 || panielli % 1 !== 0) {
                $('#panielli').parent().addClass("errato");
                errato = 1;
            } else {
                $('#panielli').parent().removeClass("errato");
            }

            var peso = parseFloat(($('#peso').val()).replace(',', '.'));

            if (isNaN(peso) || peso <= 0) {
                $('#peso').parent().addClass("errato");
                errato = 1;
            } else {
                $('#peso').parent().removeClass("errato");
            }

            var idro = parseFloat(($('#idro').val()).replace(',', '.'));

            if (isNaN(idro) || idro < 50 || idro > 100) {
                $('#idro').parent().addClass("errato");
                errato = 1;
            } else {
                $('#idro').parent().removeClass("errato");
            }

            var salepl = parseFloat(($('#salepl').val()).replace(',', '.'));

            if (isNaN(salepl) || salepl < 0 || salepl > 70) {
                $('#salepl').parent().addClass("errato");
                errato = 1;
            } else {
                $('#salepl').parent().removeClass("errato");
            }

            var liev = parseFloat(($('#liev').val()).replace(',', '.'));

            if (isNaN(liev) || liev < 3 || liev > 96) {
                $('#liev').parent().addClass("errato");
                errato = 1;
            } else {
                $('#liev').parent().removeClass("errato");
            }

            var frigo = parseFloat(($('#frigo').val()).replace(',', '.'));

            $('#frigo').parent().attr("title", "Inserire un numero non negativo");

            if ((isNaN(frigo) || frigo < 0 || frigo > liev - 1) && frigo != 0) {
                if (frigo > liev - 1) {
                    $('#frigo').parent().attr("title", "Non superare il totale ore diminuito di 1")
                }
                $('#frigo').parent().addClass("errato");
                errato = 1;
            }
            else {
                $('#frigo').parent().removeClass("errato");
            }

            var gradi = parseFloat(($('#gradi').val()).replace(',', '.'));

            if (isNaN(gradi) || gradi < 15 || gradi > 35) {
                $('#gradi').parent().addClass("errato");
                errato = 1;
            } else {
                $('#gradi').parent().removeClass("errato");
            }

            var grassipl = parseFloat(($('#grassipl').val()).replace(',', '.'));

            if (isNaN(grassipl) || grassipl < 0 || grassipl > 100) {
                $('#grassipl').parent().addClass("errato");
                errato = 1;
            } else {
                $('#grassipl').parent().removeClass("errato");
            }

            var pdrp = parseFloat(($('#pdrp').val()).replace(',', '.'));

            var riporto = parseFloat($('input[name="pdrt"]:checked').val());

            switch (riporto) {
                case 1:
                    var pdrt = 1 / 300;
                    break;
                case 2:
                    var pdrt = 1 / 200;
                    break;
                case 3:
                    var pdrt = 1 / 100;
                    break;
            }

            var coeff = 57.5;

            var ore = liev - frigo * 9 / 10;

            var forzatot = (81.4206918743428 + 78.3939060802556 * Math.log(liev));

            var forza = Math.round(forzatot / 10) * 10;

            var kappa = coeff * (1 + salepl / 200) * (1 + grassipl / 300) / ((-80 + 4.2 * idro - 0.0305 * idro * idro) * Math.pow(gradi * ore, 1.2));

            var impasto = panielli * peso; //impasto totale in grammi, farina più acqua

            var denominatore = idro * (salepl + grassipl) + 1000 * (idro + 100); //identico nelle 5 formule

            var pdrpmax = (100000 * kappa * 100 / (100000 * kappa + denominatore * pdrt)).toString().match(/^\d+(?:\.\d{0,2})?/);

            if (errato == 1) {
                $('#pdrp').parent().attr("title", "Correggere i dati precedenti");
            }
            else {
                $('#pdrp').parent().attr("title", "Inserire un numero tra 0 e " + pdrpmax);
            }

            if (isNaN(pdrp) || pdrp < 0 || pdrp > pdrpmax) {
                $('#pdrp').parent().addClass("errato");
                errato = 1;
            }
            else {
                $('#pdrp').parent().removeClass("errato");
            }

            var pdr = impasto * pdrp / 100;

            var farina = (100000 * (impasto - pdr)) / denominatore; //in grammi

            var aqua = ((1000 * idro * (impasto - pdr)) / denominatore).toFixed(0); //in grammi, quindi millilitri

            var sale = ((salepl * idro * (impasto - pdr)) / denominatore).toFixed(0); //in grammi

            var grassi = ((grassipl * idro * (impasto - pdr)) / denominatore).toFixed(0); //in grammi

            var lievito = (farina * kappa - pdrt * pdr).toFixed(2);

            farina = farina.toFixed(0);

            pdr = pdr.toFixed(0);

            if (isNaN(forza) || errato == 1 || wprot) {
                $('#forza').html('-');
            } else {
                $('#forza').html(forza.toString());
            }
            if (isNaN(farina) || errato == 1) {
                $('#farina').html('-');
            } else {
                $('#farina').html(farina.toString() + ' g');
            }
            if (isNaN(aqua) || errato == 1) {
                $('#aqua').html('-');
            } else {
                $('#aqua').html(aqua.toString() + ' g');
            }
            if (isNaN(sale) || errato == 1) {
                $('#sale').html('-');
            } else {
                $('#sale').html(sale.toString() + ' g');
            }
            if (isNaN(grassi) || errato == 1) {
                $('#grassi').html('-');
            } else {
                $('#grassi').html(grassi.toString() + ' g');
            }
            if (isNaN(pdr) || errato == 1) {
                $('#pdr').html('-');
            } else {
                $('#pdr').html(pdr.toString() + ' g');
            }
            if (isNaN(lievito) || errato == 1) {
                $('#lievito').html('-');
            } else {
                $('#lievito').html(lievito.toString().replace('.', ',') + ' g');
            }
            // I valori inseriti non permettono di ottenere un risultato sensato

        }

    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

        console.log('Received Event: ' + id);

    }
};

app.initialize();