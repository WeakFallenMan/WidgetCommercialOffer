  
    $("input[type=text]").keypress(function (b) {
        var C = /[0-9\x25\x27\x24\x23]/;
        var a = b.which;
        var c = String.fromCharCode(a);
        return !!(a == 0 || a == 8 || a == 9 || a == 13 || c.match(C));
    });

    jQuery(document).ready(function ($) {
        $("#counter").flipCounter(
            {
                digitHeight: 35,
                digitWidth: 26.3,
                formatNumberOptions: { format: "000,000" } 
            }
        );
    });
    
    function initBigGauge() {
        var opts = {
            lines: 15, // The number of lines to draw
            angle: 0.0, // The length of each line
            lineWidth: 0.03, // The line thickness
            pointer: {
                length: 0.65, // The radius of the inner circle
                strokeWidth: 0.04, // The rotation offset
                color: '#f25a2c' // Fill color
            },
            limitMax: 'true',   // If true, the pointer will not go past the end of the gauge

            colorStart: '#6FADCF',   // Colors
            colorStop: '#8FC0DA',    // just experiment with them
            strokeColor: '#E0E0E0',   // to see which ones work best for you
            generateGradient: false
        };

        var target = document.getElementById('monthGauge'); // your canvas element
        bigGauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        bigGauge.setMinValue(6);
        bigGauge.maxValue = 42; // set max gauge value
        bigGauge.animationSpeed = 32; // set animation speed (32 is default value)
        bigGauge.set(7); // set actual value
        updateBigGauge(6);
    };

    function initSmallGauge() {
        var opts = {
            lines: 12, // The number of lines to draw
            angle: 0.0, // The length of each line
            lineWidth: 0.03, // The line thickness
            pointer: {
                length: 0.75, // The radius of the inner circle
                strokeWidth: 0.04, // The rotation offset
                color: '#f25a2c' // Fill color
            },
            limitMax: 'true',   // If true, the pointer will not go past the end of the gauge

            colorStart: '#6FADCF',   // Colors
            colorStop: '#8FC0DA',    // just experiment with them
            strokeColor: '#E0E0E0',   // to see which ones work best for you
            generateGradient: true
        };

        var target = document.getElementById('advanceGauge'); // your canvas element
        smallGauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        smallGauge.maxValue = 50; // set max gauge value
        smallGauge.animationSpeed = 32; // set animation speed (32 is default value)
        smallGauge.set(1); // set actual value
        updateSmallGauge(0);
    };

    $(function () {

        $("#widget").dialog({
            height: 650,
            width: 900,
            modal: true,
            resizable: false,
            draggable: false
        });

        initSmallGauge();
        initBigGauge();
    });

    function updateSmallGauge(setValue) {

        if (setValue >= 0 && setValue <= 50)
        {
            smallGauge.set(setValue);
            AnimationUpdater.run();
        }        
    }

    function updateBigGauge(setValue) {
        if (setValue >= 6 && setValue <= 42)
        {
            bigGauge.set(setValue);
            AnimationUpdater.run();
        }        
    }

    function calculate() {

        calcPercent();

        leasingAmount = document.getElementById("tbLeasingAmount").value.replace(/\s+/g, '');
        advance = document.getElementById("tbAdvance").value.replace(/\s+/g, '');
        advancePercent = document.getElementById("tbPercent").value;
        irrPercent = document.getElementById("slctLeasingSubject").value;
        month = document.getElementById("tbMonth").value;

        updateSmallGauge(parseInt(advancePercent));
        updateBigGauge(parseInt(month));

        if ((advancePercent >= 0) && (advancePercent <= 50) && (month >= 6) && (month <= 42)) {
            c = leasingAmount - ((leasingAmount / 100) * advancePercent);
            b = (irrPercent / 100) / 12;

            paymentTotal = Math.ceil((c * b) / (1 - (1 / Math.pow((1 + b), month))));
            $("#counter").flipCounter("setNumber", paymentTotal);
        }
    }

    function calcPercent() {
        var percent;
        advance = document.getElementById("tbAdvance").value.replace(/\s+/g, '');
        leasingAmount = document.getElementById("tbLeasingAmount").value.replace(/\s+/g, '');

        if (advance <= 0)
            percent = document.getElementById("tbPercent").value;
        else
            percent = Math.ceil(((advance) * 100) / leasingAmount);

        if (percent <= 50) {
            document.getElementById("tbPercent").value = percent;
            calcAdvance(percent);
        }
    }

    function calcAdvance(percent) {
        
        if (percent == null)
            percent = document.getElementById("tbPercent").value;
        else
            document.getElementById("tbPercent").value = percent;

        advanceValue = Math.ceil((percent / 100) * document.getElementById("tbLeasingAmount").value.replace(/\s+/g, ''));
        document.getElementById("tbAdvance").value = advanceValue.toString().replace(/[^\d]/g, "").split("").reverse().join("").replace(/\d{3}(?!$|(?:\s$))/g, "$& ").split("").reverse().join("");
    }

    function enterEmail() {
        var x;
        var email = prompt("Введите свой email:");

        if (email != null) {
            alert("Вы ввели: " + email);
        }
    }