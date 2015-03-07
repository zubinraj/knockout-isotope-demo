var $container = $("#container");

ko.bindingHandlers.isotope = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var $el = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor());

        var $container = $(value.container);

        $container.isotope({
            itemSelector: value.itemSelector
        });

        $container.isotope('appended', $el);

    }

};

var box = function (input) {

    var _color = ko.observable(input);

    return {
        color: _color
    };
};

var layout = function () {

    var _items = ko.observableArray([

    new box('red'),
    new box('red'),
    new box('cyan'),
    new box('cyan'),
    new box('green'),
    new box('cyan'),
    new box('red'),
    new box('green')]);

    return {
        items: _items,
        addItem: add
    }

    function add(item) {
        // add a new item
        console.log('item: ' + item);
        _items.push(new box(item));
    }

};

var vm = new layout();
ko.applyBindings(vm);


$('#filters a').click(function () {
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter: selector });
    return false;
});

$('#commands a').click(function () {
    var data = $(this).attr('data');

    vm.addItem(data);

    return false;
});