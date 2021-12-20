{% include 'vendors.swig' %}


<script src="https://cdn.jsdelivr.net/npm/hexo-blog-assets@0.0.1/core-ut.js"></script>
{%- if theme.motion.enable %}
  {{- next_js('motion.js') }}
{%- endif %}

{%- set scheme_script = 'schemes/' + theme.scheme | lower + '.swig' %}
{% include scheme_script %}

<script src="https://cdn.jsdelivr.net/npm/hexo-blog-assets@0.0.1/next-boot.js"></script>
{%- if theme.bookmark.enable %}
  {{- next_js('bookmark.js') }}
{%- endif %}
{%- if theme.pjax %}
  {% include 'pjax.swig' %}
{%- endif %}
{% include 'three.swig' %}
