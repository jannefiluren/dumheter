import m from "mithril";

let Home = {
    view: function() {
        return m("main", [
            m("h1", "Weather and water app"),
            m("p", "Some air temperatures and runoff data...")
        ]);
    }
};

export default Home;
