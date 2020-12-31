$(function () {
  let layer = layui.layer;
  let form = layui.form;
  function initArtCateList() {
    // 获取文章分类的列表
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return "请求失败";
        }
        var newH = template("tabal_list", res);

        $("tbody").html(newH);
      },
    });
  }
  initArtCateList();
  var newindex = null;
  //为添加类别按钮添加点击事件
  $("#btnlei").on("click", function () {
    newindex = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#formli").html(),
    });
  });
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("新增失败");
        }
        layer.msg("新增成功");
        initArtCateList();
        layer.close(newindex);
      },
    });
  });
  var newEdit = null;
  $("tbody").on("click", ".edit", function () {
    newEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#indexEdit").html(),
    });
    var id = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新分类数据失败！");
        }
        layer.msg("更新分类数据成功！");
        initArtCateList();
        layer.close(newEdit);
      },
    });
  });
  $("tbody").on("click", ".btn-delate", function () {
    var id = $(this).attr("data-id");

    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      //do something
      $.ajax({
        method: "get",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          console.log(res);
          if (res.status !== 0) {
            return layer.msg("删除分类失败");
          }
          layer.msg("删除分类成功");
          initArtCateList();
          layer.close(index);
        },
      });
    });
  });
});
