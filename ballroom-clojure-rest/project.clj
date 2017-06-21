(defproject ballroom-clojure-rest "0.1.0-SNAPSHOT"
  :description "Restful API for Ballroom Dance Choreographer"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [compojure "1.5.1"]
                 [ring/ring-defaults "0.2.1"]
                 [cheshire "5.7.1"]
                 [com.datomic/datomic-free "0.9.5561.50"]]
  :plugins [[lein-ring "0.9.7"]]
  :ring {:handler ballroom-clojure-rest.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.0"]]}})