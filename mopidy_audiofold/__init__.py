import logging
import pathlib
import os

import pkg_resources

from mopidy import config, ext

__version__ = pkg_resources.get_distribution("Mopidy-Audiofold").version

# TODO: If you need to log, use loggers named after the current Python module
logger = logging.getLogger(__name__)

class Extension(ext.Extension):

    dist_name = 'Mopidy-Audiofold'
    ext_name = 'audiofold'
    version = __version__

    def get_config_schema(self):
        schema = super(Extension, self).get_config_schema()
        return schema

    def get_default_config(self):
        return config.read(os.path.join(os.path.dirname(__file__), 'ext.conf'))

    def setup(self, registry):
        registry.add('http:static', {
            'name': self.ext_name,
            'path': os.path.join(os.path.dirname(__file__), 'static')
        })
