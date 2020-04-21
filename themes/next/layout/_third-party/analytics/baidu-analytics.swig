{%- if theme.baidu_analytics %}
  <script{{ pjax }}>
    var _hmt = _hmt || [];
    (function() {
      if (window.location.hostname === 'localhost') return
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?{{ theme.baidu_analytics }}";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  </script>
{%- endif %}
