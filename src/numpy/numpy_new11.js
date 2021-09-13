var $builtinmodule = function (name) {
	let mod= {__name__: new Sk.builtin.str("numpy")};
    
    // func: numpy.arange
    var arange_f=function(start, stop, step , dtype) {
		Sk.builtin.pyCheckArgs("arange", arguments, 1, 4);
        Sk.builtin.pyCheckType("start", "number", Sk.builtin.checkNumber(start));
        var start_num;
        var stop_num;
        var step_num;
        var type= dtype || Sk.builtin.none.none$;

        if (stop === undefined && step === undefined) {
            start_num = 0;
            stop_num = Sk.ffi.remapToJs(start);
            step_num = Sk.ffi.remapToJs(1);
        } else if (step === undefined) {
            start_num = Sk.ffi.remapToJs(start);
            stop_num = Sk.ffi.remapToJs(stop);
            step_num = 1;
        } else {
            start_num = Sk.ffi.remapToJs(start);
            stop_num = Sk.ffi.remapToJs(stop);
            step_num = Sk.ffi.remapToJs(step);
        }
        
        // 返回生成的array
        var arange_buffer = math.range(start_num, stop_num, step_num)['_data'];
        // set to float
        if (dtype == Sk.builtin.none.none$) {
            if (Sk.builtin.checkInt(start)) {
                console.log("1")
                dtype = Sk.builtin.int_;
                for (i = 0; i < arange_buffer.length; i++) {
                    arange_buffer[i] = Math.floor(arange_buffer[i]);
                }
            } else {
                console.log("2")
                dtype = Sk.builtin.float_;
                for (i = 0; i < arange_buffer.length; i++) {
                    arange_buffer[i] = new Sk.builtin.float_(arange_buffer[i]);
                }
            }
        }else{
            if(dtype == Sk.builtin.int_){
                console.log("3")
                for (i = 0; i < arange_buffer.length; i++) {
                    arange_buffer[i] = new Sk.builtin.int_(arange_buffer[i]);
                }
            }else if(dtype == Sk.builtin.float_){
                console.log("4")
                for (i = 0; i < arange_buffer.length; i++) {
                    arange_buffer[i] = new Sk.builtin.float_(arange_buffer[i]);
                }
            }
        }

        return Sk.ffi.remapToPy(arange_buffer);
	}
	mod.arange = new Sk.builtin.func(arange_f);
    
	return mod;
}