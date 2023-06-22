'use client';

import Container from "../Container"
import { FaSkiing } from "react-icons/fa"
import { TbBeach,TbMountain,TbPool } from "react-icons/tb"
import { GiIsland, GiWindmill,GiBoatFishing, GiCastle, GiForestCamp, GiCaveEntrance, GiCactus, GiBarn } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import { BsSnow } from "react-icons/bs"
import {IoDiamond} from "react-icons/io5"
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "This property is close to the Windmills!"
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "This property is close to the City Center!"
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This property is close to the country side!"
    },
    {
        label: "Pool",
        icon: TbPool,
        description: "This property is close to the Pool!"
    },
    {
        label: "Island",
        icon: GiIsland,
        description: "This property is close to the Island!"
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is close to the Lake!"
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "This property is close to the Sking!"
    },
    {
        label: "Castels",
        icon: GiCastle,
        description: "This property is close to the Castels!"
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This property is close to the Camping!"
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "This property is close to the Ice!"
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This property is close to the Cave!"
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This property is close to the Desert!"
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "This property is close to the Barns!"
    },
    {
        label: "Lux",
        icon: GiBarn,
        description: "This property is luxrious!"
    },
]
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("catetgory");
    const pathName = usePathname();

    const isMainPage = pathName === "/";
    if (!isMainPage) {
        return null;
    }
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-auto">
                {
                    categories.map(item => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            selected={category === item.label}
                            icon={item.icon}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default Categories