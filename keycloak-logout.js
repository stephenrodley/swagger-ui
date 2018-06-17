function OAuthLogoutPlugin() {

    var lastAuthUrl = null;

    return {
      statePlugins: {
        auth: {
          wrapActions: {

            authorizeOauth2: (originalAction, system) => (payload) => {
              originalAction(payload);

              var auth = payload.auth;

              if (auth) {
                lastAuthUrl = auth.schema.get('authorizationUrl');
              }
            },

            logout: (originalAction, system) => (payload) => {
              originalAction(payload);

              if (lastAuthUrl) {
                var redirectUrl = location.protocol + "//" + location.host + location.pathname + 'oauth2-logout.html';

                var logoutUrl = lastAuthUrl.substring(0, lastAuthUrl.lastIndexOf('/')) + '/logout';
                logoutUrl += "?redirect_uri=" + encodeURIComponent(redirectUrl);

                window.open(logoutUrl);
              }
            }

          }
        }
      }
    }

  }