var red = "#bf4f4e";
var orange = "#f6944c";
var yellow = "#fffc30";
var green = "#9cb95e";
var pink = "#e5b8b7";
var blue = "#4dadc5";
var lightOrange = "#fcd4b5";
var lightGreen = "#d9e3bd";
var paleGreen = "#ebf0db";
var lightBlue = "#b8dede";
var paleBlue = "#eef7f7";
var navy = "#4f83bb";
var lightPink = "#f2dcda";
var pale = "#fde9da";
var extraPale = "#fef1e7";
var purple = "#BDA0CB";
var lightPurple = "#b8cce4";
var palePurple = "#dae4f1";
var grey = "#C0C0C0";

var lines = 
    [    
        {"start": "1", "end": "7", "color": yellow},
        {"start": "2", "end": "2.2", "color": red},
        {"start": "3", "end": "3.3", "color": red},
        {"start": "4", "end": "4.4", "color": red},
        {"start": "5", "end": "5.4", "color": red},
        {"start": "6", "end": "6.5", "color": red},        
        {"start": "1", "end": "1.2", "color": red},
        {"start": "1.1", "end": "1.13", "color": orange},
        {"start": "1.2", "end": "1.21", "color": orange},
        {"start": "2", "end": "2.01", "color": lightPink, "actualEnd": "2.07"},
        {"start": "2.01", "end": "2.07", "color": lightPink, "actualStart": "2"},
        {"start": "2.01", "end": "2.014", "color": lightOrange},
        {"start": "2.012", "end": "2.01204", "color": paleGreen},
        {"start": "2.012", "end": "2.0121", "color": lightGreen},
        {"start": "2.0121", "end": "2.0126", "color": lightGreen},
        {"start": "2.014", "end": "2.0142", "color": lightGreen},
        {"start": "2.0124", "end": "2.01241", "color": lightBlue},
        {"start": "2.0141", "end": "2.01411", "color": lightBlue},
        {"start": "2.02", "end": "2.0201", "color": pale, "actualEnd": "2.027"},
        {"start": "2.02", "end": "2.021", "color": lightOrange},
        {"start": "2.021", "end": "2.027", "color": lightOrange, "actualStart": "2.02"},
        {"start": "2.03", "end": "2.033", "color": lightOrange},
        {"start": "2.023", "end": "2.0233", "color": lightGreen},
        {"start": "2.021", "end": "2.0212", "color": lightGreen},
        {"start": "2.025", "end": "2.0252", "color": lightGreen},
        {"start": "2.027", "end": "2.0272", "color": lightGreen},
        {"start": "2.0233", "end": "2.02331", "color": lightBlue},
        {"start": "2.06", "end": "2.0601", "color": pale},
        {"start": "2.06", "end": "2.061", "color": lightOrange, "actualEnd": "2.062"},
        {"start": "2.061", "end": "2.062", "color": lightOrange, "actualStart": "2.06"},
        {"start": "2.1", "end": "2.19", "color": orange},
        {"start": "2.2", "end": "2.21", "color": orange, "actualEnd": "2.22"},
        {"start": "2.21", "end": "2.22", "color": orange, "actualStart": "2.2"},
        {"start": "2.2", "end": "2.203", "color": lightOrange},
        {"start": "2.22", "end": "2.225", "color": green},
        {"start": "2.13", "end": "2.131", "color": green},
        {"start": "2.15", "end": "2.1516", "color": green},
        {"start": "2.151", "end": "2.15101", "color": lightGreen},
        {"start": "2.1513", "end": "2.15131", "color": blue},
        {"start": "2.16", "end": "2.161", "color": green},
        {"start": "2.17", "end": "2.175", "color": green},
        {"start": "2.18", "end": "2.182", "color": green},
        {"start": "3", "end": "3.001", "color": lightPink},
        {"start": "3", "end": "3.01", "color": pink, "actualEnd": "3.05"},
        {"start": "3.01", "end": "3.05", "color": pink, "actualStart": "3"},
        {"start": "3.03", "end": "3.032", "color": lightOrange},
        {"start": "3.032", "end": "3.0321", "color": lightGreen},
        {"start": "3.1", "end": "3.16", "color": orange},
        {"start": "3.11", "end": "3.111", "color": green},
        {"start": "3.14", "end": "3.141", "color": green},
        {"start": "3.16", "end": "3.1604", "color": lightGreen},
        {"start": "3.1602", "end": "3.16021", "color": lightBlue},
        {"start": "3.16", "end": "3.161", "color": green, "actualEnd": "3.164"},
        {"start": "3.161", "end": "3.164", "color": green, "actualStart": "3.16"},
        {"start": "3.162", "end": "3.1622", "color": blue},
        {"start": "3.2", "end": "3.202", "color": lightOrange},
        {"start": "3.201", "end": "3.20108", "color": lightGreen},
        {"start": "3.201", "end": "3.2011", "color": lightGreen, "actualEnd": "3.2017"},
        {"start": "3.2011", "end": "3.2017", "color": lightGreen, "actualStart": "3.201"},
        {"start": "3.2012", "end": "3.20122", "color": lightBlue},
        {"start": "3.20122", "end": "3.201221", "color": lightPurple},
        {"start": "3.2014", "end": "3.20142", "color": lightBlue},
        {"start": "3.20141", "end": "3.201412", "color": lightPurple},
        {"start": "3.2015", "end": "3.20152", "color": lightBlue},
        {"start": "3.2017", "end": "3.20173", "color": lightBlue},
        {"start": "3.20173", "end": "3.201731", "color": lightPurple},
        {"start": "3.202", "end": "3.2021", "color": lightGreen},
        {"start": "3.2021", "end": "3.20212", "color": lightBlue},
        {"start": "3.20211", "end": "3.202111", "color": lightPurple},
        {"start": "3.2", "end": "3.21", "color": orange, "actualEnd": "3.25"},
        {"start": "3.21", "end": "3.25", "color": orange, "actualStart": "3.2"},
        {"start": "3.21", "end": "3.2104", "color": lightGreen},
        {"start": "3.21", "end": "3.211", "color": green, "actualEnd": "3.214"},
        {"start": "3.211", "end": "3.214", "color": green, "actualStart": "3.21"},
        {"start": "3.24", "end": "3.242", "color": green},
        {"start": "3.25", "end": "3.253", "color": green},
        {"start": "3.213", "end": "3.2131", "color": blue},
        {"start": "3.214", "end": "3.2142", "color": blue},
        {"start": "3.241", "end": "3.2411", "color": blue},
        {"start": "3.242", "end": "3.2421", "color": blue},
        {"start": "3.2421", "end": "3.24211", "color": navy},
        {"start": "3.251", "end": "3.2513", "color": blue},
        {"start": "3.252", "end": "3.2522", "color": blue},
        {"start": "3.253", "end": "3.2531", "color": blue},
        {"start": "4", "end": "4.001", "color": lightPink, "actualEnd": "4.0016"},        
        {"start": "4.001", "end": "4.0016", "color": lightOrange, "actualStart": "4"},        
        {"start": "4.0014", "end": "4.00141", "color": paleGreen},
        {"start": "4.0015", "end": "4.00151", "color": paleGreen},
        {"start": "4.0016", "end": "4.00163", "color": paleGreen},
        {"start": "4", "end": "4.01", "color": pink, "actualEnd": "4.09"},
        {"start": "4.01", "end": "4.09", "color": pink, "actualStart": "4"},
        {"start": "4.01", "end": "4.0103", "color": pale},
        {"start": "4.01", "end": "4.011", "color": lightOrange},        
        {"start": "4.011", "end": "4.0116", "color": lightGreen},
        {"start": "4.0112", "end": "4.01122", "color": lightBlue},
        {"start": "4.0114", "end": "4.01141", "color": lightBlue},
        {"start": "4.01141", "end": "4.011411", "color": navy},
        {"start": "4.02", "end": "4.026", "color": lightOrange},
        {"start": "4.05", "end": "4.051", "color": lightOrange},
        {"start": "4.07", "end": "4.074", "color": lightOrange},
        {"start": "4.09", "end": "4.095", "color": lightOrange},
        {"start": "4.023", "end": "4.0232", "color": lightGreen},
        {"start": "4.0232", "end": "4.02322", "color": lightBlue},
        {"start": "4.026", "end": "4.0262", "color": lightGreen},
        {"start": "4.071", "end": "4.0712", "color": lightGreen},
        {"start": "4.072", "end": "4.0721", "color": lightGreen},
        {"start": "4.072", "end": "4.0721", "color": lightGreen},
        {"start": "4.074", "end": "4.0743", "color": lightGreen},
        {"start": "4.091", "end": "4.0911", "color": lightGreen},
        {"start": "4.092", "end": "4.0923", "color": lightGreen},
        {"start": "4.095", "end": "4.0953", "color": lightGreen},
        {"start": "4.1", "end": "4.1001", "color": pale},
        {"start": "4.1001", "end": "4.10019", "color": lightGreen},
        {"start": "4.10015", "end": "4.100154", "color": paleBlue},
        {"start": "4.10016", "end": "4.100161", "color": paleBlue},
        {"start": "4.10017", "end": "4.100171", "color": paleBlue},
        {"start": "4.100153", "end": "4.1001531", "color": palePurple},
        {"start": "4.1", "end": "4.101", "color": lightOrange},
        {"start": "4.101", "end": "4.104", "color": lightOrange},
        {"start": "4.101", "end": "4.1011", "color": lightGreen},
        {"start": "4.102", "end": "4.1022", "color": lightGreen},
        {"start": "4.103", "end": "4.1032", "color": lightGreen},
        {"start": "4.1", "end": "4.11", "color": orange},
        {"start": "4.11", "end": "4.11", "color": green},
        {"start": "4.1022", "end": "4.10227", "color": lightBlue},
        {"start": "4.10221", "end": "4.102212", "color": lightPurple},
        {"start": "4.10223", "end": "4.102234", "color": lightPurple},
        {"start": "4.10224", "end": "4.102241", "color": lightPurple},
		{"start": "4.10225", "end": "4.1022501", "color": lightPurple},
        {"start": "4.10225", "end": "4.10225", "color": lightPurple},
        {"start": "4.10225", "end": "4.102251", "color": lightPurple, "actualEnd": "4.102254"},
        {"start": "4.102251", "end": "4.102254", "color": lightPurple, "actualStart": "4.10225"},
        {"start": "4.10226", "end": "4.102265", "color": lightPurple},
        {"start": "4.10227", "end": "4.102274", "color": lightPurple},
        {"start": "4.102233", "end": "4.1022331", "color": purple},
        {"start": "4.102251", "end": "4.1022511", "color": purple},
        {"start": "4.102263", "end": "4.1022631", "color": purple},
        {"start": "4.102272", "end": "4.1022729", "color": purple},
        {"start": "4.1022725", "end": "4.10227254", "color": grey},
        {"start": "4.1022728", "end": "4.10227281", "color": grey},
        {"start": "4.1022729", "end": "4.10227291", "color": grey},
        {"start": "4.2", "end": "4.26", "color": orange},
        {"start": "4.22", "end": "4.222", "color": green},
        {"start": "4.23", "end": "4.232", "color": green},
        {"start": "4.221", "end": "4.2215", "color": blue},
        {"start": "4.2212", "end": "4.22122", "color": navy},
        {"start": "4.2213", "end": "4.22131", "color": navy},
        {"start": "4.2215", "end": "4.22151", "color": navy},
        {"start": "4.3", "end": "4.31", "color": orange},
        {"start": "4.4", "end": "4.4001", "color": pale},
        {"start": "4.4", "end": "4.401", "color": lightOrange},
        {"start": "4.401", "end": "4.4011", "color": lightGreen},
        {"start": "4.4", "end": "4.41", "color": orange},
        {"start": "4.41", "end": "4.44", "color": orange},
        {"start": "4.42", "end": "4.423", "color": green},
        {"start": "4.422", "end": "4.4221", "color": blue},
        {"start": "4.43", "end": "4.4303", "color": lightGreen},
        {"start": "4.4301", "end": "4.43014", "color": lightBlue},
        {"start": "4.43014", "end": "4.430141", "color": lightPurple},
        {"start": "4.43", "end": "4.431", "color": green, "actualEnd": "4.433"},
        {"start": "4.431", "end": "4.433", "color": green, "actualStart": "4.43"},
        {"start": "4.431", "end": "4.4311", "color": blue},
        {"start": "4.432", "end": "4.4322", "color": blue},
        {"start": "4.433", "end": "4.4331", "color": blue},
        {"start": "4.44", "end": "4.449", "color": green},
        {"start": "4.446", "end": "4.44602", "color": lightBlue},
        {"start": "4.446", "end": "4.4461", "color": blue, "actualEnd": "4.4462"},
        {"start": "4.4461", "end": "4.4462", "color": blue, "actualStart": "4.446"},
        {"start": "4.448", "end": "4.44801", "color": lightBlue},
        {"start": "4.448", "end": "4.4481", "color": blue, "actualEnd": "4.4486"},
        {"start": "4.4481", "end": "4.4486", "color": blue, "actualStart": "4.448"},
        {"start": "4.449", "end": "4.4492", "color": blue},
        {"start": "4.4486", "end": "4.44861", "color": navy},
        {"start": "5", "end": "5.001", "color": pale, },
        {"start": "5.001", "end": "5.005", "color": lightPink},
        {"start": "5.001", "end": "5.0017", "color": pale},
        {"start": "5.002", "end": "5.0022", "color": pale},
        {"start": "5.004", "end": "5.0041", "color": pale},
        {"start": "5.005", "end": "5.00501", "color": extraPale},
        {"start": "5.005", "end": "5.0051", "color": pale},
        {"start": "5.0051", "end": "5.0054", "color": pale},
        {"start": "5.0016", "end": "5.00163", "color": paleGreen},
        {"start": "5.0053", "end": "5.00535", "color": paleGreen},
        {"start": "5.041", "end": "5.04105", "color": lightGreen},        
        {"start": "5.00534", "end": "5.005342", "color": paleBlue},
        {"start": "5.00535", "end": "5.005351 ", "color": paleBlue},
        {"start": "5", "end": "5.01", "color": pink, "actualEnd": "5.09"},
        {"start": "5.01", "end": "5.09", "color": pink, "actualStart": "5"},
        {"start": "5.01", "end": "5.013", "color": lightOrange},
        {"start": "5.02", "end": "5.023", "color": lightOrange},
        {"start": "5.04", "end": "5.044", "color": lightOrange},
        {"start": "5.08", "end": "5.082", "color": lightOrange},
        {"start": "5.09", "end": "5.093", "color": lightOrange},        
        {"start": "5.041", "end": "5.0411", "color": lightGreen},
        {"start": "5.0411", "end": "5.0415", "color": lightGreen},
        {"start": "5.044", "end": "5.0444", "color": lightGreen},
        {"start": "5.04102", "end": "5.041021", "color": lightBlue},
        {"start": "5.04103", "end": "5.041031", "color": lightBlue},
        {"start": "5.0411", "end": "5.04113", "color": lightBlue},
        {"start": "5.0414", "end": "5.04141", "color": lightBlue},
        {"start": "5.0444", "end": "5.04442", "color": lightBlue},
        {"start": "5.093", "end": "5.0934", "color": lightGreen},
        {"start": "5.0931", "end": "5.09311", "color": lightBlue},
        {"start": "5.1", "end": "5.101", "color": lightOrange},
        {"start": "5.1", "end": "5.11", "color": orange, "actualEnd": "5.12"},
        {"start": "5.11", "end": "5.12", "color": orange, "actualStart": "5.1"},
        {"start": "5.2", "end": "5.23", "color": orange},
        {"start": "5.22", "end": "5.2201", "color": lightGreen},
        {"start": "5.22", "end": "5.221", "color": green, "actualEnd": "5.224"},
        {"start": "5.221", "end": "5.224", "color": green, "actualStart": "5.22"},
        {"start": "5.23", "end": "5.234", "color": green},
        {"start": "5.221", "end": "5.2211", "color": navy},
        {"start": "5.233", "end": "5.2331", "color": navy},
        {"start": "5.3", "end": "5.3003", "color": pale},
        {"start": "5.3", "end": "5.301", "color": lightOrange},
        {"start": "5.301", "end": "5.307", "color": lightOrange},
        {"start": "5.302", "end": "5.30202", "color": pale},
        {"start": "5.302", "end": "5.3021", "color": lightGreen, "actualEnd": "5.3024"},
        {"start": "5.3021", "end": "5.3024", "color": lightGreen, "actualStart": "5.302"},
        {"start": "5.303", "end": "5.3032", "color": lightGreen},
        {"start": "5.306", "end": "5.3064", "color": lightGreen},
        {"start": "5.307", "end": "5.3073", "color": lightGreen},
        {"start": "5.3063", "end": "5.30634", "color": lightBlue},
        {"start": "5.3064", "end": "5.30641", "color": lightBlue},
        {"start": "5.3022", "end": "5.30225", "color": lightBlue},
        {"start": "5.3023", "end": "5.30231", "color": lightBlue},
        {"start": "5.3", "end": "5.31", "color": orange, "actualEnd": "5.34"},
        {"start": "5.31", "end": "5.34", "color": orange, "actualStart": "5.3"},
        {"start": "5.31", "end": "5.3103", "color": lightGreen},
        {"start": "5.31", "end": "5.311", "color": green, "actualEnd": "5.315"},
        {"start": "5.311", "end": "5.315", "color": green, "actualStart": "5.31"},
        {"start": "5.313", "end": "5.3133", "color": blue},
        {"start": "5.32", "end": "5.3204", "color": lightGreen},
        {"start": "5.3204", "end": "5.32041", "color": lightBlue},
        {"start": "5.32", "end": "5.321", "color": green, "actualEnd": "5.326"},
        {"start": "5.321", "end": "5.326", "color": green, "actualStart": "5.32"},
        {"start": "5.322", "end": "5.3221", "color": blue},
        {"start": "5.325", "end": "5.3251", "color": blue},
        {"start": "5.33", "end": "5.3304", "color": lightGreen},
        {"start": "5.33", "end": "5.331", "color": green, "actualEnd": "5.335"},
        {"start": "5.331", "end": "5.335", "color": green, "actualStart": "5.33"},
        {"start": "5.34", "end": "5.343", "color": green},
        {"start": "5.332", "end": "5.3321", "color": blue},
        {"start": "5.334", "end": "5.3344", "color": blue},
        {"start": "5.335", "end": "5.3355", "color": blue},
        {"start": "5.343", "end": "5.3432", "color": blue},
        {"start": "5.4", "end": "5.405", "color": lightOrange},
        {"start": "5.401", "end": "5.4012", "color": lightGreen},
        {"start": "5.404", "end": "5.4043", "color": lightGreen},
        {"start": "5.405", "end": "5.4051", "color": lightGreen},
        {"start": "5.4042", "end": "5.40421", "color": lightBlue},
        {"start": "5.4", "end": "5.41", "color": orange},
        {"start": "5.41", "end": "5.42", "color": orange},
        {"start": "5.41", "end": "5.4101", "color": lightGreen, "actualEnd": "5.4103"},
        {"start": "5.4101", "end": "5.41011", "color": lightBlue},
        {"start": "5.4101", "end": "5.4103", "color": lightGreen, "actualStart": "5.41"},
        {"start": "5.41", "end": "5.411", "color": green, "actualEnd": "5.414"},
        {"start": "5.411", "end": "5.414", "color": green, "actualStart": "5.41"},
        {"start": "5.42", "end": "5.422", "color": green},
        {"start": "5.421", "end": "5.4214", "color": blue},
        {"start": "5.422", "end": "5.4223", "color": blue},
        {"start": "5.3341", "end": "5.33412", "color": navy},
        {"start": "5.3353", "end": "5.33532", "color": navy},
        {"start": "5.3354", "end": "5.33546", "color": navy},
        {"start": "5.3355", "end": "5.33552", "color": navy},
        {"start": "5.33543", "end": "5.335431", "color": purple},
        {"start": "6", "end": "6.001", "color": lightPink, "actualEnd": "6.005"},
        {"start": "6.001", "end": "6.005", "color": lightPink, "actualStart": "6"},
        {"start": "6", "end": "6.01", "color": pink, "actualEnd": "6.02"},
        {"start": "6.01", "end": "6.02", "color": pink, "actualStart": "6"},
        {"start": "6.01", "end": "6.013", "color": lightOrange},
        {"start": "6.02", "end": "6.0201", "color": pale},
        {"start": "6.004", "end": "6.0043", "color": pale},
        {"start": "6.005", "end": "6.0051", "color": pale},
        {"start": "6.1", "end": "6.1004", "color": pale},
        {"start": "6.1", "end": "6.101", "color": lightOrange, "actualEnd": "6.102"},
        {"start": "6.101", "end": "6.102", "color": lightOrange},
        {"start": "6.1", "end": "6.11", "color": orange, "actualEnd": "6.13"},
        {"start": "6.11", "end": "6.13", "color": orange, "actualStart": "6.1"},
        {"start": "6.11", "end": "6.114", "color": green},
        {"start": "6.12", "end": "6.122", "color": green},
        {"start": "6.13", "end": "6.131", "color": green},
        {"start": "6.112", "end": "6.1122", "color": blue},
        {"start": "6.113", "end": "6.1136", "color": blue},
        {"start": "6.114", "end": "6.1143", "color": blue},
        {"start": "6.121", "end": "6.1216", "color": blue},
        {"start": "6.122", "end": "6.1221", "color": blue},
        {"start": "6.1134", "end": "6.11343", "color": navy},
        {"start": "6.1135", "end": "6.113501", "color": blue},
        {"start": "6.1135", "end": "6.11351", "color": navy, "actualEnd": "6.11352"},
        {"start": "6.11351", "end": "6.11352", "color": navy, "actualStart": "6.1135"},
        {"start": "6.1211", "end": "6.12112", "color": navy},
        {"start": "6.2", "end": "6.24", "color": orange},
        {"start": "6.3", "end": "6.37", "color": orange},
        {"start": "6.21", "end": "6.212", "color": green},
        {"start": "6.23", "end": "6.232", "color": green},        
        {"start": "6.31", "end": "6.311", "color": green},
        {"start": "6.33", "end": "6.331", "color": green},
        {"start": "6.34", "end": "6.341", "color": green},
        {"start": "6.36", "end": "6.365", "color": green},
        {"start": "6.37", "end": "6.375", "color": green},
        {"start": "6.341", "end": "6.3412", "color": blue},
        {"start": "6.363", "end": "6.3632", "color": blue},
        {"start": "6.365", "end": "6.3652", "color": blue},
        {"start": "6.375", "end": "6.3752", "color": blue},        
        {"start": "6.3632", "end": "6.36323", "color": navy},
        {"start": "6.3652", "end": "6.36521", "color": navy},
        {"start": "6.4", "end": "6.44", "color": orange},
        {"start": "6.5", "end": "6.55", "color": orange},
        {"start": "6.42", "end": "6.422", "color": green},
        {"start": "6.43", "end": "6.432", "color": green},
        {"start": "6.44", "end": "6.442", "color": green},
        {"start": "6.52", "end": "6.521", "color": green},
        {"start": "6.53", "end": "6.531", "color": green},
        {"start": "6.422", "end": "6.4221", "color": blue},
        {"start": "6.441", "end": "6.4412", "color": blue},
        {"start": "6.442", "end": "6.4423", "color": blue},
        {"start": "6.521", "end": "6.5211", "color": blue},
        {"start": "6.4422", "end": "6.44221", "color": navy},
        {"start": "6.4423", "end": "6.44232", "color": navy}

    ];
