interface InfoLayout {
    key: string;
    items: Items[];
}
interface Items {
    label: string;
    value: string;
}

export const INFO_DATA: Record<string, InfoLayout[]> = {
    "Hardware-Info": [
        {
            key: "Hardware Info",
            items: [
                { label: "Case", value: "ATX Cryptone-Y" },
                { label: "PSU", value: "Cougar VTE600" },
                { label: "Motherboard", value: "ASRock B550 Phantom Gaming 4" },
                { label: "CPU", value: "AMD Ryzen 5 5600" },
                { label: "Cooler", value: "ID-COOLING SE-206-XT ARGB" },
                { label: "RAM", value: "ADATA XPG SPECTRIX D41 32 GB" },
                { label: "Graphics card", value: "GeForce RTX 4060 CYCLONE OC" },
                { label: "Memories",
                    value: "ADATA SU650 SSD 240 GB,\nADATA SU650 SSD 512 GB"
                }
            ]
        }
    ],
    "More-Info": [
        {
            key: "More Info",
            items: [
                { label: "OS", value: "Windows 11 Pro" },
                { label: "Monitor", value: '23.8" DEXP DF24N1' },
                { label: "Wi-Fi+B Adapter", value: "Edimax EW-7611UCB" },
                { label: "Headphones", value: "ARDOR GAMING Edge" },
                { label: "Microphone", value: "Fifine AmpliGame A8" },
                { label: "Speakers", value: "No" },
                { label: "Keyboard", value: "ARDOR GAMING Pathfinder" },
                { label: "Mouse", value: "Logitech G102 LIGHTSYNC" },
                { label: "Mouse pad", value: "DEXP GM-XL Black Speed" },
                { label: "VR-Helmet", value: "No, planning to buy Pico 4" },
                { label: "Tracking", value: "No" },
            ]
        }
    ]
}
