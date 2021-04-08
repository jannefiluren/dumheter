import m from "mithril";

let Observations = {

    time: [],
    temperature: [],
    loaded: false,

    reset: function () {
        Observations.time = [];
        Observations.temperature = [];
        Observations.loaded = false;
    },

    getTemperature: function (id) {
        // eslint-disable-next-line max-len
        let url = encodeURIComponent(`https://17a75e17-0189-4e73-95ec-c8615b3854d9@frost.met.no/observations/v0.jsonld?sources=${id}&elements=mean(air_temperature%20P1D)&referencetime=2008-04-01/2020-10-01`);

        return m.request({
            method: "GET",
            url: "http://www.student.bth.se/~efostud/api-proxy/proxy.php?url=" + url
        })
            .then(res => res.data)
            .then(data => data.forEach(elem => {
                Observations.time.push(elem.referenceTime.substr(0, 10));
                Observations.temperature.push(elem.observations[0].value);
            }))
            .then(() => Observations.loaded = true);
    }
};

export default Observations;
