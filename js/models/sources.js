import m from "mithril";

let Sources = {

    data: [],
    loaded: false,

    getSources: () => {
        // eslint-disable-next-line max-len
        let url = encodeURIComponent("https://17a75e17-0189-4e73-95ec-c8615b3854d9@frost.met.no/sources/v0.jsonld?validtime=now&elements=mean(air_temperature%20P1D)");

        m.request({
            method: "GET",
            url: "http://www.student.bth.se/~efostud/api-proxy/proxy.php?url=" + url
        })
            .then(res => {
                res.data.forEach(elem => {
                    Sources.data.push({
                        id: elem.id,
                        name: elem.name,
                        //coordinates: elem.geometry.coordinates,
                    });
                });
                Sources.loaded = true;
            });
    }
};

export default Sources;
