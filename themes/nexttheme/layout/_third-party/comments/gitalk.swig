{% if theme.gitalk.enable %}
  {% if page.comments %}
    <script src="https://cdn.jsdelivr.net/npm/gitalk/dist/gitalk.min.js"></script>
    <script type="text/javascript">
      const gitalk = new Gitalk({
        clientID: '{{theme.gitalk.clientID}}',
        clientSecret: '{{theme.gitalk.clientSecret}}',
        repo: '{{theme.gitalk.repo}}',
        owner: '{{theme.gitalk.owner}}',
        admin: '{{theme.gitalk.admin}}'.split(','),
        id: location.pathname,
        pagerDirection: '{{theme.gitalk.pagerDirection}}',
        // facebook-like distraction free mode
        distractionFreeMode: false
      })
      gitalk.render('gitalk-container')
    </script>
  {% endif %}
{% endif %}
