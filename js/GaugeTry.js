//$(document).ready(function () {

//    };
////    var viewModel = {

////        circularGaugeOptions: {
////            scale: {
////                startValue: 6,
////                endValue: 42,
////                majorTick: { tickInterval: 3 },
////                minorTick: { visible: true, tickInterval: 1 }
////            }
////        }
////    };

//})

var ViewModel = function() {
    this.myValue = ko.observable(25);
};

ko.applyBindings(new ViewModel());