$(function () {
  var layer = layui.layer;
  var form = layui.form;
  var laypage = layui.laypage;
  // 定义一个查询的参数对象，将来请求数据的时候，
  // 需要将请求参数对象提交到服务器
  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: "", // 文章分类的 Id
    state: "", // 文章的发布状态
  };
  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);

    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());

    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());

    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : "0" + n;
  }
  //获取文章列表
  function inittable() {
    $.ajax({
      method: "get",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("请求数据失败");
        }

        var newHtml = template("tpl-table", res);
        $("tbody").html(newHtml);
        renderPage(res.total);
      },
    });
  }
  inittable();
  inittCake();
  function inittCake() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("失败");
        }
        let newcate = template("tpl-cate", res);
        $('[ name="cate_id"]').html(newcate);
        form.render();
      },
    });
  }
  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    var cate_id = $('[ name="cate_id"]').val();
    var state = $('[ name="state"]').val();
    q.cate_id = cate_id;
    q.state = state;
    inittable();
  });
  function renderPage(total) {
    laypage.render({
      elem: "pageBox", //注意，这里的 test1 是 ID，不用加 # ,
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 5, 10, 15],
      jump: function (obj, first) {
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        // inittable()
        if (first !== true) {
          inittable();
        }
      },
    });
  }
  //删除文章功能
  $("tbody").on("click", "#btn-cleate", function () {
    var id = $(this).attr("data-id");
    var len = $("#btn-cleate").length;
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      //do something
      $.ajax({
        method: "get",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除文章失败");
          }
          layer.msg("删除文章成功");

          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          inittable();
          layer.close(index);
        },
      });
    });
  });
});
