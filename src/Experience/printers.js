export default {
    "Prusa MKS3": {
        "default_material": "PLA",
        "default_material_profile": "Prusa PLA",
        "default_quality": "Normal",
        "default_quality_profile": "Normal",
        "default_variant": "0.4mm Nozzle",
        "machine_extruder_trains": {
            "0": "mks3_extruder_0"
        },
        "machine_heated_bed": true,
        "machine_name": "Prusa MKS3",
        "machine_start_gcode": ['M862.3 P "[printer_model]" ; printer model check\n',
                                "M862.1 P[nozzle_diameter] ; nozzle diameter check\n",
                                "M115 U3.12.2 ; tell printer latest fw version\n",
                                "G90 ; use absolute coordinates\n",
                                "M83 ; extruder relative mode\n",
                                "M104 S[first_layer_temperature] ; set extruder temp\n",
                                "M140 S[first_layer_bed_temperature] ; set bed temp\n",
                                "M190 S[first_layer_bed_temperature] ; wait for bed temp\n",
                                "M109 S[first_layer_temperature] ; wait for extruder temp\n",
                                "G28 W ; home all without mesh bed level\n",
                                "G80 ; mesh bed leveling\n",
                                "{if filament_settings_id[initial_tool]=~/.*Prusament PA11.*/}\n",
                                "G1 Z0.3 F720 ; move up slightly\n",
                                "G1 Y-3 F1000 ; go outside print area\n",
                                "G92 E0\n",
                                "G1 X60 E9 F1000 ; intro line\n",
                                "G1 X100 E9 F1000 ; intro line",
                                "{else}\n",
                                "G1 Z0.2 F720\n",
                                "G1 Y-3 F1000 ; go outside print area\n",
                                "G92 E0\n",
                                "G1 X60 E9 F1000 ; intro line\n",
                                "G1 X100 E12.5 F1000 ; intro line\n",
                                "{endif}\n",
                                "G92 E0 ; reset extruder\n",
                                "M221 S{if layer_height<0.075}100{else}95{endif}\n",
                                "; Don't change E values below. Excessive value can damage the printer.\n",
                                "{if print_settings_id=~/.*(DETAIL @MK3|QUALITY @MK3).*/}M907 E430 ; set extruder motor current{endif}\n",
                                "{if print_settings_id=~/.*(SPEED @MK3|DRAFT @MK3).*/}M907 E538 ; set extruder motor current{endif}\n"],
        "machine_end_gcode": [  "{if max_layer_z < max_print_height}G1 Z{z_offset+min(max_layer_z+1, max_print_height)} F720 ; Move print head up{endif}\n",
                                "G1 X0 Y200 F3600 ; park\n",
                                "{if max_layer_z < max_print_height}G1 Z{z_offset+min(max_layer_z+49, max_print_height)} F720 ; Move print head further up{endif}\n",
                                "G4 ; wait\n",
                                "M221 S100 ; reset flow\n",
                                "M900 K0 ; reset LA\n",
                                "{if print_settings_id=~/.*(DETAIL @MK3|QUALITY @MK3|@0.25 nozzle MK3).*/}M907 E538 ; reset extruder motor current{endif}\n",
                                "M104 S0 ; turn off temperature\n",
                                "M140 S0 ; turn off heatbed\n",
                                "M107 ; turn off fan\n",
                                "M84 ; disable motors\n",
                                "; max_layer_z = [max_layer_z]\n"],
        "machine_width": 200,
        "machine_depth": 200,
        "machine_height": 220,
        "machine_center_is_zero": false,
        "machine_nozzle_size": 0.4,
        "min_layer_height": 0.1,
        "max_layer_height": 1.2,
        "machine_max_feedrate": 300,
        "machine_max_z_slope": 20,
        "extruder_count": 1,
        "extrusion_width": 0.45,
        "extrusion_multiplier": 0.015,
    },

    "Creality Ender-3":{
        "default_material": "PLA",
        "default_material_profile": "Creality PLA",
        "default_quality": "Normal",
        "default_quality_profile": "Normal",
        "default_variant": "0.4mm Nozzle",
        "machine_extruder_trains": {
            "0": "ender3_extruder_0"
        },
        "machine_heated_bed": true,
        "machine_name": "Creality Ender-3",
        "machine_start_gcode": ["G28 ; home all axes\n",
                                "G1 Z15.0 F9000 ; lift nozzle\n",
                                "G92 E0 ; zero the extruded length\n",
                                "G1 F200 E3 ; extrude 3mm of feed stock\n",
                                "G92 E0 ; zero the extruded length again\n",
                                "G1 F9000\n",
                                "M117 Printing..."],
        "machine_end_gcode": [  "M104 S0 ; turn off extruder\n",
                                "M140 S0 ; turn off bed\n",
                                "G91 ; relative positioning\n",
                                "G1 E-1 F300  ; retract the filament a bit before lifting the nozzle, to release some of the pressure\n",
                                "G1 Z+0.5 E-5 X-20 Y-20 F9000 ; move Z up a bit and retract filament even more\n",
                                "G28 X0 Y0 ; move X/Y to min endstops, so the head is out of the way\n",
                                "M84 ; disable motors\n",
                                "G90 ; absolute positioning\n",
                                "G1 X0 Y200 F3000 ; present print\n",
                                "M117 Printing Done"],
        "machine_width": 220,
        "machine_depth": 220,
        "machine_height": 250,
        "machine_center_is_zero": false,
        "machine_nozzle_size": 0.4,
        "min_layer_height": 0.5,
        "max_layer_height": 1.2,
        "machine_max_feedrate": 300,
        "machine_max_z_slope": 20,
    }
}