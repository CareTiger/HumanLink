import json
import logging
import webapp2

from webapp2_extras import (
    auth,
    jinja2,
    sessions
)


# Default jinja2 configs.
jinja2.default_config['template_path'] = 'views'
env_args = {
    'block_start_string': '[%',
    'block_end_string': '%]',
    'variable_start_string': '[=',
    'variable_end_string': '=]',
}
jinja2.default_config['environment_args'].update(env_args)


def login_required(func):
    """Decorator that requires the user to be logged in
    to use a given method.
    Redirects to the login page if not logged in.

    Usage:
        @login_required
        def profile(self):
            ...
    """
    def check_login(self, *args, **kwargs):
        if not self.user:
            if self._is_json_request():
                raise webapp2.HTTPException(code=401)
            else:
                return self.redirect_to('accounts_index')
        else:
            return func(self, *args, **kwargs)
    return check_login


class BaseHandler(webapp2.RequestHandler):
    """Base handler for all controllers."""

    # This property will be populated if the request is /json.
    request_json = None

    @webapp2.cached_property
    def jinja2(self):
        """Returns a jinja2 renderer cached in the app registry.
        See jinja2.default_config for default jinja2 configs."""
        return jinja2.get_jinja2(app=self.app)

    def render(self, template, context):
        """Renders a template and writes the result to the response."""
        context['user'] = self.user_model
        rv = self.jinja2.render_template(template, **context)
        self.response.write(rv)

    def write_json(self, response):
        """Writes a JSON response.

        This should be used with a JSON API method."""
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))

    @webapp2.cached_property
    def session_store(self):
        return sessions.get_store(request=self.request)

    @webapp2.cached_property
    def session(self):
        """Current session."""
        return self.session_store.get_session(backend="datastore")

    def dispatch(self):
        """Dispatch an incoming request.
        This method also persists session object after the request.
        """
        try:
            # Handle JSON requests slightly differently.
            if self._is_json_request():
                self.request_json = (self.request.GET
                                     if self.request.method == 'GET' else
                                     json.loads(self.request.body))
            webapp2.RequestHandler.dispatch(self)
        finally:
            self.session_store.save_sessions(self.response)

    @webapp2.cached_property
    def auth(self):
        """Handles user authentication."""
        return auth.get_auth(request=self.request)

    @webapp2.cached_property
    def user(self):
        """This just returns a minimal info about the user."""
        user = self.auth.get_user_by_session()
        return user

    @webapp2.cached_property
    def user_model(self):
        """Gets the user object for the user from the datastore."""
        user_model, timestamp = self.auth.store.user_model.get_by_auth_token(
            self.user['user_id'],
            self.user['token']) if self.user else (None, None)
        return user_model

    def handle_exception(self, exception, debug):
        """Exception handler for a webapp2 request.

        TODO(kanat): Implement this similar to api.base.handle_exception.
        """
        logging.exception(exception)
        result = {
            'status': 'error',
            'status_code': 400,
            'error_message': 'yo mama',
        }
        self.response.headers.add_header('Content-Type', 'application/json')
        self.response.write(json.dumps(result))
        self.response.set_status(result['status_code'])

    def _is_json_request(self):
        return self.request.path.endswith('.json')
