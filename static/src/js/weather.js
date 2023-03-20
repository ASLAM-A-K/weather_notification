/** @odoo-module **/
import { Dropdown } from "@web/core/dropdown/dropdown";
import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";
var rpc = require('web.rpc');

let lon;
let lat;
let date_month;
let weather_type;
let temperature;
let summary;
let loc;
const kelvin = 273;
const date = new Date();
let api;
export class WeatherNotificationMenu extends Component {
 async setup() {
             await rpc.query({
                model: 'res.config.settings',
                method: 'get_api_key',
                args:[]
                 }).then(function (result) {
                    api = result[0];
                    if(!result[1]){ $('.check').hide(); }
                 });
             if (navigator.geolocation && api) {
                 navigator.geolocation.getCurrentPosition((position) => {
                  lon = position.coords.longitude;
                  lat = position.coords.latitude;
                   const base =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +`lon=${lon}&appid=${api}`;
                   fetch(base)
                 .then((response) => {
                        return response.json();
                            })
            .then((data) => {
                     temperature =
                     Math.floor(data.main.temp - kelvin) + "° ";
                     summary = data.weather[0].description;
                     loc = data.name + "," + data.sys.country;
                     weather_type = data.weather[0].main;
                     const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"];
                     date_month = date.getDate()+' '+ monthNames[date.getMonth()]+' '+ date.getFullYear();
                     });
                });
            }
    }

 get weather() {
        var weather_dict = {
            temperature: temperature,
            summary : summary,
            location: loc,
            date_month: date_month,
            weather_type : weather_type,
            update_date : moment(date).format('YYYY-MM-DD HH:mm:ss'),
            api: api
        };
        return weather_dict;
    }
}
WeatherNotificationMenu.template = "WeatherSystray";
WeatherNotificationMenu.components = { Dropdown };

export const systrayItem = {
    Component: WeatherNotificationMenu,
};

registry.category("systray").add("WeatherNotificationMenu", systrayItem, { sequence: 2 });
