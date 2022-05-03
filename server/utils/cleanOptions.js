export default {
    allowedTags: ['iframe','br','strong','blockquote','script'], 
    allowedAttributes: { 'iframe': ['src','height'], 'script': ['src'] },
    allowedIframeHostnames: ['www.youtube.com',
                            'codesandbox.io',
                            'codepen.io',
                            'www.thiscodeworks.com',
                            'gist.github.com',
                            'plot.ly',
                            'www.kaggle.com',
                            'player.vimeo.com',
                          'plotly.com'], 
    nestingLimit : 5,
    allowedScriptDomains: [ 'gist.github.com' ],
    allowedScriptHostnames :['gist.github.com'],
    allowVulnerableTags:true
  }