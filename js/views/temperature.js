import m from "mithril";
import Chart from 'chart.js/auto';
import Observations from "../models/observations";
import Sources from "../models/sources";


let ChartComponent = {

    oncreate: () => {
        let ctx = document.getElementById('chart').getContext('2d');
        let config = {
            type: 'line',
            data: {
                labels: Observations.time,
                datasets: [{
                    label: 'Air temperature',
                    data: Observations.temperature,
                    fill: false,
                    borderColor: 'rgba(255, 99, 132)',
                    tension: 0.1,
                }]
            },
            options: {
                responsive: true,
            }
        };

        new Chart(ctx, config);
    },

    view: () => {
        return m(".chart-container",
            m("canvas#chart")
        );
    }
};


let DropdownComponent = {

    view: () => {
        return [
            m("label", {for: "station"}, "Choose station:"),
            m("select", {name: "station", id: "station", onchange: () => {
                let e = document.getElementById("station");

                Observations.reset();
                Observations.getTemperature(e.value);
            }},
            Sources.data.map(elem => {
                return m("option", {value: elem.id}, elem.id);
            }))
        ];
    }
};


let Temperature = {

    oninit: () => {
        Sources.getSources();
    },

    view: function() {
        return m("main", [
            m("h1", "Air temperature"),
            [Sources.loaded ? m(DropdownComponent) : m("p", "Loading station list...")],
            [Observations.loaded ? m(ChartComponent): m(".chart-container")]
        ]);
    }
};

export default Temperature;
