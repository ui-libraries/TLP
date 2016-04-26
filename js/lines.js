var red = "#bf4f4e";
var orange = "#f6944c";
var yellow = "#fffc30";
var green = "#9cb95e";
var pink = "#e5b8b7";
var blue = "#4dadc5";
var lightOrange = "#fcd4b5";
var lightGreen = "#d9e3bd";
var lightBlue = "#b8dede";
var navy = "#4f83bb";
var lightPink = "#f2dcda";
var pale = "#fde9da";
var x = 0;

var lines = 
    [        
        {"start": "1", "end": "7", "color": "yellow"},
        {"start": "1", "end": "1.2", "color": red},
        {"start": "1.1", "end": "1.13", "color": orange},
        {"start": "1.2", "end": "1.21", "color": orange},
        
        {"start": "2", "end": "2.06", "color": pink},
        {"start": "2", "end": "2.2", "color": red},
        {"start": "2.2", "end": "2.202", "color": lightOrange},
        {"start": "2.2", "end": "2.22", "color": orange},
        {"start": "2.22", "end": "2.225", "color": green},
        {"start": "2.1", "end": "2.19", "color": orange},
        {"start": "2.06", "end": "2.063", "color": lightOrange},
        {"start": "2.03", "end": "2.034", "color": lightOrange},
        {"start": "3.1", "end": "3.14", "color": orange},
        {"start": "2.02", "end": "2.027", "color": lightOrange},
        {"start": "2.02", "end": "2.02021", "color": pale},
        {"start": "2.01", "end": "2.014", "color": lightOrange},
        {"start": "2.021", "end": "2.0212", "color": lightGreen},
        {"start": "2.023", "end": "2.0233", "color": lightGreen},
        {"start": "2.025", "end": "2.0251", "color": lightGreen},
        {"start": "2.027", "end": "2.0272", "color": lightGreen},
        {"start": "2.0233", "end": "2.02331", "color": lightBlue},
        {"start": "2.012", "end": "2.0124", "color": lightGreen},
        {"start": "2.013", "end": "2.0131", "color": lightGreen},
        {"start": "2.014", "end": "2.0141", "color": lightGreen},
        {"start": "2.0123", "end": "2.01231", "color": lightBlue},        
        {"start": "2.13", "end": "2.131", "color": green},
        {"start": "2.14", "end": "2.141", "color": green},
        {"start": "2.15", "end": "2.151", "color": green},
        {"start": "2.16", "end": "2.161", "color": green},
        {"start": "2.17", "end": "2.174", "color": green},
        {"start": "2.18", "end": "2.182", "color": green},
        {"start": "2.151", "end": "2.1515", "color": blue},
        {"start": "2.1512", "end": "2.15121", "color": navy},
        
        {"start": "3", "end": "3.5", "color": red},
        {"start": "3.1", "end": "3.14", "color": orange},
        {"start": "3.2", "end": "3.26", "color": orange},
        {"start": "3.3", "end": "3.34", "color": orange},
        {"start": "3.4", "end": "3.42", "color": orange},
        {"start": "3.4", "end": "3.42", "color": orange},
        {"start": "3.14", "end": "3.144", "color": green},
        {"start": "3.22", "end": "3.221", "color": green},
        {"start": "3.25", "end": "3.251", "color": green},
        {"start": "3.26", "end": "3.263", "color": green},
        {"start": "3.31", "end": "3.318", "color": green},
        {"start": "3.32", "end": "3.328", "color": green},
        {"start": "3.33", "end": "3.334", "color": green},
        {"start": "3.34", "end": "3.344", "color": green},
        {"start": "3.41", "end": "3.411", "color": green},
        {"start": "3.143", "end": "3.1432", "color": blue},
        {"start": "3.341", "end": "3.3411", "color": blue},
        {"start": "3.342", "end": "3.3421", "color": blue},
        {"start": "3.344", "end": "3.3442", "color": blue},
        {"start": "3", "end": "3.05", "color": pink},
        {"start": "3.03", "end": "3.032", "color": lightOrange},
        {"start": "3.032", "end": "3.0321", "color": lightGreen},
        {"start": "3.01", "end": "3.001", "color": lightPink},
        
        {"start": "4", "end": "4.5", "color": red},
        {"start": "4.1", "end": "4.12", "color": orange},
        {"start": "4.2", "end": "4.28", "color": orange},
        {"start": "4.3", "end": "4.31", "color": orange},
        {"start": "4.4", "end": "4.46", "color": orange},
        {"start": "4.5", "end": "4.53", "color": orange},
        {"start": "4.11", "end": "4.116", "color": green},
        {"start": "4.12", "end": "4.128", "color": green},
        {"start": "4.21", "end": "4.211", "color": green},
        {"start": "4.22", "end": "4.221", "color": green},
        {"start": "4.24", "end": "4.243", "color": green},
        {"start": "4.41", "end": "4.411", "color": green},
        {"start": "4.43", "end": "4.431", "color": green},
        {"start": "4.44", "end": "4.442", "color": green},
        {"start": "4.46", "end": "4.466", "color": green},
        {"start": "4.112", "end": "4.1122", "color": blue},
        {"start": "4.121", "end": "4.1213", "color": blue},
        {"start": "4.122", "end": "4.1221", "color": blue},
        {"start": "4.124", "end": "4.1241", "color": blue},
        {"start": "4.125", "end": "4.1252", "color": blue},
        {"start": "4.127", "end": "4.1274", "color": blue},
        {"start": "4.221", "end": "4.2211", "color": blue},
        {"start": "4.461", "end": "4.4611", "color": blue},
        {"start": "4.466", "end": "4.4661", "color": blue},
        {"start": "4.1272", "end": "4.12721", "color": navy},
        {"start": "4", "end": "4.06", "color": pink},
        {"start": "4.06", "end": "4.064", "color": lightOrange},
        {"start": "4.04", "end": "4.041", "color": lightOrange},
        {"start": "4.03", "end": "4.032", "color": lightOrange},
        {"start": "4.02", "end": "4.027", "color": lightOrange},
        {"start": "4.01", "end": "4.016", "color": lightOrange},
        {"start": "4.062", "end": "4.0621", "color": lightGreen},
        {"start": "4.064", "end": "4.0641", "color": lightGreen},
        {"start": "4.041", "end": "4.0412", "color": lightGreen},
        {"start": "4.031", "end": "4.0312", "color": lightGreen},
        {"start": "4.014", "end": "4.0141", "color": lightGreen},
        {"start": "4", "end": "4.001", "color": lightPink},
        {"start": "4.001", "end": "4.003", "color": lightPink},
        {"start": "4.003", "end": "4.0031", "color": pale},
        
        {"start": "5", "end": "5.6", "color": red},
        {"start": "5.1", "end": "5.15", "color": orange},
        {"start": "5.2", "end": "5.25", "color": orange},
        {"start": "5.3", "end": "5.32", "color": orange},
        {"start": "5.4", "end": "5.47", "color": orange},
        {"start": "5.5", "end": "5.55", "color": orange},
        {"start": "5.6", "end": "5.64", "color": orange},
        {"start": "5.12", "end": "5.124", "color": green},
        {"start": "5.13", "end": "5.136", "color": green},
        {"start": "5.14", "end": "5.143", "color": green},
        {"start": "5.15", "end": "5.156", "color": green},
        {"start": "5.23", "end": "5.234", "color": green},
        {"start": "5.24", "end": "5.242", "color": green},
        {"start": "5.25", "end": "5.254", "color": green},
        {"start": "5.44", "end": "5.442", "color": green},
        {"start": "5.45", "end": "5.454", "color": green},
        {"start": "5.46", "end": "5.461", "color": green},
        {"start": "5.47", "end": "5.476", "color": green},
        {"start": "5.51", "end": "5.515", "color": green},
        {"start": "5.52", "end": "5.526", "color": green},
        {"start": "5.53", "end": "5.535", "color": green},
        {"start": "5.54", "end": "5.542", "color": green},
        {"start": "5.55", "end": "5.557", "color": green},
        {"start": "5.62", "end": "5.621", "color": green},
        {"start": "5.63", "end": "5.634", "color": green},
        {"start": "5.64", "end": "5.641", "color": green},
        {"start": "5.124", "end": "5.1241", "color": blue},
        {"start": "5.136", "end": "5.1363", "color": blue},
        {"start": "5.151", "end": "5.1511", "color": blue},
        {"start": "5.234", "end": "5.2341", "color": blue},
        {"start": "5.252", "end": "5.2523", "color": blue},
        {"start": "5.454", "end": "5.4541", "color": blue},
        {"start": "5.461", "end": "5.4611", "color": blue},
        {"start": "5.471", "end": "5.4711", "color": blue},
        {"start": "5.473", "end": "5.4733", "color": blue},
        {"start": "5.515", "end": "5.5151", "color": blue},
        {"start": "5.526", "end": "5.5262", "color": blue},
        {"start": "5.532", "end": "5.5321", "color": blue},
        {"start": "5.535", "end": "5.5352", "color": blue},
        {"start": "5.542", "end": "5.5423", "color": blue},
        {"start": "5.552", "end": "5.5521", "color": blue},
        {"start": "5.554", "end": "5.5542", "color": blue},
        {"start": "5.556", "end": "5.5563", "color": blue},
        {"start": "5.557", "end": "5.5571", "color": blue},
        {"start": "5.633", "end": "5.6331", "color": blue},
        {"start": "5.4732", "end": "5.47321", "color": navy},
        {"start": "5.53", "end": "5.5303", "color": lightGreen},
        {"start": "5.5", "end": "5.503", "color": lightOrange},
        {"start": "5.1", "end": "5.101", "color": lightOrange},
        {"start": "5", "end": "5.02", "color": pink},
        
        {"start": "6", "end": "6.5", "color": red},
        {"start": "6.1", "end": "6.13", "color": orange},
        {"start": "6.2", "end": "6.24", "color": orange},
        {"start": "6.3", "end": "6.37", "color": orange},
        {"start": "6.4", "end": "6.45", "color": orange},
        {"start": "6.5", "end": "6.54", "color": orange},
        {"start": "6.11", "end": "6.113", "color": green},
        {"start": "6.12", "end": "6.127", "color": green},
        {"start": "6.21", "end": "6.211", "color": green},
        {"start": "6.23", "end": "6.234", "color": green},
        {"start": "6.24", "end": "6.241", "color": green},
        {"start": "6.32", "end": "6.321", "color": green},
        {"start": "6.34", "end": "6.343", "color": green},
        {"start": "6.36", "end": "6.363", "color": green},
        {"start": "6.37", "end": "6.375", "color": green},
        {"start": "6.42", "end": "6.423", "color": green},
        {"start": "6.43", "end": "6.432", "color": green},
        {"start": "6.52", "end": "6.522", "color": green},
        {"start": "6.122", "end": "6.1224", "color": blue},
        {"start": "6.123", "end": "6.1233", "color": blue},
        {"start": "6.125", "end": "6.1251", "color": blue},
        {"start": "6.126", "end": "6.1265", "color": blue},
        {"start": "6.127", "end": "6.1271", "color": blue},
        {"start": "6.231", "end": "6.2331", "color": blue},
        {"start": "6.232", "end": "6.2323", "color": blue},        
        {"start": "6.234", "end": "6.2341", "color": blue},
        {"start": "6.321", "end": "6.3211", "color": blue},
        {"start": "6.343", "end": "6.3432", "color": blue},
        {"start": "6.361", "end": "6.3611", "color": blue},
        {"start": "6.363", "end": "6.3631", "color": blue},
        {"start": "6.375", "end": "6.3751", "color": blue},
        {"start": "6.431", "end": "6.4312", "color": blue},
        {"start": "6.432", "end": "6.4321", "color": blue},
        {"start": "6.3611", "end": "6.36111", "color": navy},
        {"start": "6.3631", "end": "6.36311", "color": navy},
        {"start": "6.12", "end": "6.1203", "color": lightGreen},
        {"start": "6", "end": "6.03", "color": pink},
        {"start": "6.03", "end": "6.031", "color": lightOrange},
        {"start": "6.02", "end": "6.022", "color": lightOrange},
        {"start": "6", "end": "6.001", "color": pale},
        {"start": "6.001", "end": "6.002", "color": pale},
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        


        
         
    ];