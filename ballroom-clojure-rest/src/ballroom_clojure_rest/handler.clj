(ns ballroom-clojure-rest.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ballroom-clojure-rest.handlers.dances :refer [get-dances]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))

(defroutes app-routes
  (GET "/" [] "Hello World")
  (GET "/dance/" [] #(get-dances %))
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))
