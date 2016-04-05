/**
* Начальный загрузчик (фон + циферки)
*
* @author
*/
var PreloaderClass = function (config) {
	var me = this;

	config = config || {};

	//координаты цифр [x,y]
	this.frames = [[10,10],[113,10],[216,10],[319,10],[422,10],[525,10],[628,10],[731,10],[834,10],[10,114],[113,114],[216,114],[319,114],[422,114],[525,114],[628,114],[731,114],[834,114],[10,218],[113,218],[216,218],[319,218],[422,218],[525,218],[628,218],[731,218],[834,218],[10,322],[113,322],[216,322],[319,322],[422,322],[525,322],[628,322],[731,322],[834,322],[10,426],[113,426],[216,426],[319,426],[422,426],[525,426],[628,426],[731,426],[834,426],[10,530],[113,530],[216,530],[319,530],[422,530],[525,530],[628,530],[731,530],[834,530],[10,634],[113,634],[216,634],[319,634],[422,634],[525,634],[628,634],[731,634],[834,634],[10,738],[113,738],[216,738],[319,738],[422,738],[525,738],[628,738],[731,738],[834,738],[10,842],[113,842],[216,842],[319,842],[422,842],[525,842],[628,842],[731,842],[834,842],[10,946],[113,946],[216,946],[319,946],[422,946],[525,946],[628,946],[731,946],[834,946],[10,1050],[113,1050],[216,1050],[319,1050],[422,1050],[525,1050],[628,1050],[731,1050],[834,1050],[10,1154]];
	//начинаем с 0
	this.currentPercentage = 0;
	//достигнув 20 лоадер остановится и будет ждать команду setPercentage
	this.maxPercentage = config.maxPercentage || 20;
	//скорость автоматичекого увеличения
	this.animationSpeed = config.animationSpeed || 200; //ms

	this.preloadImages = config.preloadImages || {};

	me.animEl = document.createElement('div');
	me.blickEl = document.createElement('div');
	me.animEl.id = "loader_animation";
	me.animEl.style.top = '50%';
	me.blickEl.id = "loader_blik";
	me.blickEl.style.top = '50%';
	document.body.appendChild(me.animEl);
	document.body.appendChild(me.blickEl);
	document.body.className += " loading";
	
	if (config.onReady) {
		config.onReady();
	}

	this.nextStep();

};

PreloaderClass.prototype = {

	/**
	 * Автоматически увеличивает загрузчик от текущего значения до максимально установленного
	 */
	nextStep : function () {
		var me = this;
		setTimeout(function() {

			if (me.destroyed) {
				return;
			}

			if ( parseInt(me.currentPercentage+2) <= me.maxPercentage) {
				me.setPercentage(me.currentPercentage+2, me.maxPercentage);
			}

			if (me.currentPercentage+2 <= 100) {
				me.nextStep();
			}

		}, me.animationSpeed);
	},

	/**
	 * Устанавливает значение лоадера и максимальный предел автоматического увеличения
	 *
	 * @param {number} percentage Новое значение лоадера
	 * @param {number} maxPercent Значение до которого лоадер будет автоматически увеличиваться, если его нет то максимальное будет на 9 больше percentage.
	 */
	setPercentage : function (percentage, maxPercent) {
		this.currentPercentage = percentage;
		this.maxPercentage = maxPercent || percentage+9;
		if (this.animEl && this.frames[this.currentPercentage]) {
			this.animEl.style.backgroundPosition = (-1*this.frames[this.currentPercentage][0])+'px ' + (-1*this.frames[this.currentPercentage][1])+'px ';
		}
	},

	/**
	 * Завершить анимацию лоадера и закончить
	 */
	finishAndDestroy: function(callback) {
		var me = this;
		if (me.currentPercentage < 98) {
			me.maxPercentage = 100;
			me.animationSpeed = me.animationSpeed * 0.88;
			setTimeout(function() {
				me.finishAndDestroy(callback);
			}, me.animationSpeed * 3);
		} else {
			me.setPercentage(99);
			setTimeout(function() {
				me.destroy();
				if (callback) {
					callback();
				}
			}, 100);
		}
	},

	/**
	 * Удаляем созданный загрузчик, массив координат и сам обьект лоадера
	 */
	destroy: function () {
		this.animEl.parentNode.removeChild(this.animEl);
		this.blickEl.parentNode.removeChild(this.blickEl);
		delete window.preloader;
		delete PreloaderClass.frames;
		delete window.PreloaderClass;
		if (Ext) {
			Ext.getBody().replaceCls('loading', 'loaded'); // если Ext инициализирован, меняем класс через него, чтобы сообщить ему об изменении
		} else {
			document.body.className = document.body.className.replace("loading", "loaded");
		}
		this.destroyed = true;
	}

}