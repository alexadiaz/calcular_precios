function init() {
  var defaultDelay = 3000;
  function delay(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }

  var countries = [
    { id: 1, name: "USA", lang: "EN" },
    { id: 2, name: "Canada", lang: "FR/EN" },
    { id: 3, name: "Colombia", lang: "ES" },
    { id: 4, name: "Spain", lang: "ES" },
    { id: 5, name: "France", lang: "FR" }
  ];

  var cities = [
    { id: 1, countryId: 1, name: "New York" },
    { id: 2, countryId: 1, name: "Miami" },
    { id: 3, countryId: 1, name: "Seattle" },
    { id: 4, countryId: 1, name: "Washington" },
    { id: 5, countryId: 2, name: "Montreal" },
    { id: 6, countryId: 2, name: "Toronto" },
    { id: 7, countryId: 2, name: "Ottawa" },
    { id: 8, countryId: 2, name: "Vancouver" },
    { id: 9, countryId: 3, name: "Bogota" },
    { id: 10, countryId: 3, name: "Cali" },
    { id: 11, countryId: 3, name: "Medellin" },
    { id: 12, countryId: 3, name: "Pereira" },
    { id: 13, countryId: 4, name: "Madrid" },
    { id: 14, countryId: 4, name: "Barcelona" },
    { id: 15, countryId: 4, name: "Valencia" },
    { id: 16, countryId: 4, name: "Toledo" },
    { id: 17, countryId: 5, name: "Paris" },
    { id: 18, countryId: 5, name: "Versalles" },
    { id: 19, countryId: 5, name: "Lyon" },
    { id: 20, countryId: 5, name: "Nantes" }
  ];

  var prices = [
    { cityId: 1, price: 2.45 },
    { cityId: 2, price: 3.5 },
    { cityId: 3, price: 4.0 },
    { cityId: 4, price: 4.25 },
    { cityId: 5, price: 1.45 },
    { cityId: 6, price: 1.25 },
    { cityId: 7, price: 0.75 },
    { cityId: 8, price: 1.0 },
    { cityId: 9, price: 5.45 },
    { cityId: 10, price: 5.45 },
    { cityId: 11, price: 5.45 },
    { cityId: 12, price: 7.45 },
    { cityId: 13, price: 8.05 },
    { cityId: 14, price: 6.45 },
    { cityId: 15, price: 6.05 },
    { cityId: 16, price: 7.45 },
    { cityId: 17, price: 9.05 },
    { cityId: 18, price: 9.45 },
    { cityId: 19, price: 9.45 },
    { cityId: 20, price: 9.85 }
  ];

  var getCountryId = name => {
    name = name || "";
    var res = countries.filter(
      e => e.name.toLowerCase() === name.toLowerCase()
    );
    return res.length === 0 ? null : res[0].id;
  };

  var getCountryLang = name => {
    name = name || "";
    var res = countries.filter(
      e => e.name.toLowerCase() === name.toLowerCase()
    );
    return res.length === 0 ? null : res[0].lang;
  };

  var getCityId = function(countryId, name) {
    name = name || "";
    countryId = countryId || 0;
    var res = cities.filter(
      e =>
        e.name.toLowerCase() === name.toLowerCase() && e.countryId === countryId
    );

    return res.length === 0 ? null : res[0].id;
  };

  var getPrice = function(cityId) {
    cityId = cityId || 0;
    var res = prices.filter(e => e.cityId === cityId);

    return res.length === 0 ? null : res[0].price;
  };

  return {
    // Sync
    getCountrySync: name => {
      delay(defaultDelay);
      return getCountryId(name);
    },
    getCitySync: (countryId, name) => {
      delay(defaultDelay);
      return getCityId(countryId, name);
    },
    getPriceSync: cityId => {
      delay(defaultDelay);
      return getPrice(cityId);
    },

    // callback
    getCountryCallback: (name, cb) => {
      setTimeout(function() {
        var result = getCountryId(name);
        var err = result === null ? "cant find country " + name : null;
        cb(err, result);
      }, defaultDelay);
    },
    getLangCallback: (name, cb) => {
      setTimeout(function() {
        var result = getCountryLang(name);
        var err = result === null ? "cant find country " + name : null;
        cb(err, result);
      }, defaultDelay);
    },
    getCityCallback: (countryId, name, lang, cb) => {
      setTimeout(function() {
        if (!lang) {
          cb("missing lang", null);
          return;
        }
        var result = getCityId(countryId, name, lang);
        var err = result === null ? "cant find city " + name : null;
        cb(err, result);
      }, defaultDelay);
    },
    getPriceCallback: (cityId, cb) => {
      setTimeout(function() {
        var result = getPrice(cityId);
        var err = result === null ? "cant find price for city " + cityId : null;
        cb(err, result);
      }, defaultDelay);
    },

    getCountryPromise: name => {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          var result = getCountryId(name);
          result === null
            ? reject("cant find country " + name)
            : resolve(result);
        }, defaultDelay);
      });
    },

    getCityPromise: (countryId, name) => {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          var result = getCityId(countryId, name);
          result === null ? reject("cant find city " + name) : resolve(result);
        }, defaultDelay);
      });
    },

    getPricePromise: cityId => {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          var result = getPrice(cityId);
          result === null
            ? reject("cant find price for city " + cityId)
            : resolve(result);
        }, defaultDelay);
      });
    }
  };
}
