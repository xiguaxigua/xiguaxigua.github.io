{% include 'vendors.swig' %}


<script src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.35/images/core-ut.js"></script>
{%- if theme.motion.enable %}
  {{- next_js('motion.js') }}
{%- endif %}

{%- set scheme_script = 'schemes/' + theme.scheme | lower + '.swig' %}
{% include scheme_script %}

<script src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.31/images/next-boot.js"></script>
{%- if theme.bookmark.enable %}
  {{- next_js('bookmark.js') }}
{%- endif %}
{%- if theme.pjax %}
  {% include 'pjax.swig' %}
{%- endif %}
{% include 'three.swig' %}
