import { useCallback, useEffect } from "react";
import { IItems } from "@/models/IItems";
import { IItemsNetworking } from "@/models/IItemsNetworking";
import { IItemsGeneral } from "../Models/IItemsGeneral";
import { IItemsTv } from "../Models/IItemsTv";
import { IItemsPhone } from "../Models/IItemsPhone";
import { useStoreEquipments } from "../Store/useStoreEquipments";
import { useStoreDevicesRed } from "../Store/useStoreDevicesRed";
import { useStoreGeneral } from "../Store/useStoreGeneral";
import { useStoreTv } from "../Store/useStoreTv";
import { useStorePhones } from "../Store/useStorePhones";

type typeItems = "equipments" | "devices-red" | "general/inventory" | "tv/inventory" | "phones/inventory" | null;

const useFetchItems = (id: number | null, tipoItem: typeItems) => {
  const {
    equipments,
    isLoading: equipmentsLoading,
    error: equipmentsError,
    getEquipmentsByHeadquartersId,
  } = useStoreEquipments();

  const {
    devices,
    isLoading: devicesLoading,
    error: devicesError,
    getDevicesByHeadquartersId,
  } = useStoreDevicesRed();

  const {
    general,
    isLoading: generalLoading,
    error: generalError,
    getGeneralByHeadquartersId,
  } = useStoreGeneral();

  const {
    tvs,
    isLoading: tvLoading,
    error: tvError,
    getTvsByHeadquartersId,
  } = useStoreTv();

  const {
    phones,
    isLoading: phonesLoading,
    error: phonesError,
    getPhonesByHeadquartersId,
  } = useStorePhones();

  const fetchItems = useCallback(async () => {
    if (!id || !tipoItem) return;

    switch (tipoItem) {
      case "equipments":
        await getEquipmentsByHeadquartersId(id);
        break;
      case "devices-red":
        await getDevicesByHeadquartersId(id);
        break;
      case "general/inventory":
        await getGeneralByHeadquartersId(id);
        break;
      case "tv/inventory":
        await getTvsByHeadquartersId(id);
        break;
      case "phones/inventory":
        await getPhonesByHeadquartersId(id);
        break;
      default:
        break;
    }
  }, [
    id,
    tipoItem,
    getEquipmentsByHeadquartersId,
    getDevicesByHeadquartersId,
    getGeneralByHeadquartersId,
    getTvsByHeadquartersId,
    getPhonesByHeadquartersId,
  ]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const items: IItems[] | IItemsNetworking[] | IItemsGeneral[] | IItemsTv[] | IItemsPhone[] | null =
    tipoItem === "equipments"
      ? equipments
      : tipoItem === "devices-red"
      ? devices
      : tipoItem === "general/inventory"
      ? general
      : tipoItem === "tv/inventory"
      ? tvs
      : tipoItem === "phones/inventory"
      ? phones
      : null;

  const loadingItems =
    tipoItem === "equipments"
      ? equipmentsLoading
      : tipoItem === "devices-red"
      ? devicesLoading
      : tipoItem === "general/inventory"
      ? generalLoading
      : tipoItem === "tv/inventory"
      ? tvLoading
      : tipoItem === "phones/inventory"
      ? phonesLoading
      : false;

  const errorItems =
    tipoItem === "equipments"
      ? equipmentsError
      : tipoItem === "devices-red"
      ? devicesError
      : tipoItem === "general/inventory"
      ? generalError
      : tipoItem === "tv/inventory"
      ? tvError
      : tipoItem === "phones/inventory"
      ? phonesError
      : null;

  return { items, loadingItems, errorItems, refetch: fetchItems };
};

export default useFetchItems;