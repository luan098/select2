define(["jquery", "../utils"], function ($, Utils) {
  function SelectAll() {}

  SelectAll.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $selectAll = $(
      '<span class="select2-select-all select2-select-all--dropdown">' +
        '<button type="button" class="btn btn-block btn-default select2-select-all__button">Selecionar Todos</button>' +
        "</span>"
    );

    this.$selectAllContainer = $selectAll;
    this.$selectAll = $selectAll.find("button");

    $rendered.prepend($selectAll);

    return $rendered;
  };

  SelectAll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var resultsId = container.id + "-results";

    decorated.call(this, container, $container);

    this.$selectAll.on("click", function (evt) {
      self.handleClick(evt);
    });
  };

  SelectAll.prototype.handleClick = function (evt, b, c) {
    elements = this.$dropdownContainer.find(".select2-results__option");

    elements.each((i, e) => {
      var data = Utils.GetData(e, "data");

      if (
        (data.element != null && data.element.selected) ||
        (data.element == null && data.selected)
      ) {
        this.trigger("unselect", {
          data: data,
        });

      } else {
        this.trigger("select", {
          data: data,
        });
      }
    });
  };

  SelectAll.prototype.showSelectAll = function (_, params) {
    return true;
  };

  return SelectAll;
});
