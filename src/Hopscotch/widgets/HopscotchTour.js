/*global mx, mendix, require, console, define, module, logger */
(function() {
    'use strict';

    require([

        'dojo/_base/declare', 'Hopscotch/widgets/HopscotchBase', 'dijit/_TemplatedMixin',
        'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text',
        'Hopscotch/widgets/lib/hopscotchsrc'

    ], function (declare, _HopscotchBase, _Templated, dom, DojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, _hopscotch) {

        return declare('Hopscotch.widgets.HopscotchTour', [ _HopscotchBase, _Templated, _hopscotch ], {

            templatePath: require.toUrl('Hopscotch/widgets/templates/HopscotchTour.html'),

    		tour: null,
    		steps: null,

            constructor: function () {
    		},

            postCreate: function () {

    			this.tour = this.params;

                //this.tour.id = this.multipageid ? this.multipageid : this.id;
                this.tour.id = this.id;
                this.tour.steps = this._buildSteps();

                this.tour.onStart = lang.hitch(this, this.execmf, this.tour.onStartMF);
    			this.tour.onEnd = lang.hitch(this, this.execmf, this.tour.onEndMF);
    			this.tour.onPrev = lang.hitch(this, this.execmf, this.tour.onPrevMF);
    			this.tour.onNext = lang.hitch(this, this.execmf, this.tour.onNextMF);
    			this.tour.onClose = lang.hitch(this, this.execmf, this.tour.onCloseMF);
    			this.tour.onError = lang.hitch(this, this.execmf, this.tour.onErrorMF);
            },

            startup: function () {
                setTimeout(lang.hitch(this, "startTour"), 1000);
            },

            uninitialize: function () {
                this.hop.endTour(false);
            },

            startTour: function () {
                this.hop.startTour(this.tour);
            },

            _buildSteps: function() {
            	this.steps.forEach(function(step) {
                    if (step.onNextMF) {
                        step.onNext = lang.hitch(this, this.execmf, step.onNextMF);
                    }
                    if (step.onPrevMF) {
                        step.onPrev = lang.hitch(this, this.execmf, step.onPrevMF);
                    }
                    if (step.onShowMF) {
                        step.onShow = lang.hitch(this, this.execmf, step.onShowMF);
                    }
                    if (step.onCtaMF) {
	    			    step.onCTA = lang.hitch(this, this.execmf, step.onCtaMF);
                    }
                    if (step.onCloseMF) {
                        step.onClose = lang.hitch(this, this.execmf, step.onCloseMF);
                    }
                    if (step.onErrorMF) {
                        step.onError = lang.hitch(this, this.execmf, step.onErrorMF);
                    }
            	}, this);

                return this.steps;
            }
        });
    });
})();