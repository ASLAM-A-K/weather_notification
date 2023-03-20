from odoo import models, fields, api


class SetAPi(models.TransientModel):
    _inherit = 'res.config.settings'

    set_api = fields.Char('Weather API',
                          config_parameter='weather_notification.apikey')
    api_button = fields.Boolean(
        config_parameter='weather_notification.api_button')

    @api.model
    def get_api_key(self):
        api_key = self.env['ir.config_parameter'].sudo().get_param(
            'weather_notification.apikey')
        api_button = self.env['ir.config_parameter'].sudo().get_param(
            'weather_notification.api_button')
        return [api_key, api_button]

    @api.onchange('api_button')
    def _onchange_api_button(self):
        if not self.api_button:
            self.set_api = ''

