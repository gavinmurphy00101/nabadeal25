export interface CreateBusiness{
    id:string;
    name: string;
    description: string;
    category: string;
    email: string;
    phone: string;
    website: string;
    contact_name:string;
}

export interface Marker{
    position: LatLng; 
    map: any;
    title:string;
    icon:string;
    category:string;
    name: string;
    description: string;
    activeDeal: boolean;
    currentDeal: {id:string};
    dealHistory: string[];
    id: string;
    businessPhone: string;
    businessEmail: string;
    businessWebsite: string;
    display?: boolean;
}

export interface MenuItems{
    name: string;
    slug: string;
    icon: string;
}

export interface Business{
    activeDeal:string ;
    businessName:string ;
    description:string ;
    businessPhone:string ;
    businessEmail:string ;
    businessWebsite?:string ;
    businessCategory?:string;
    businessFormattedAddress?:string;
    businessImageUrl?:string;
    businessAddress?:string;
}

export interface LatLng{
    lat: number; 
    lng: number;
}

export interface CustomDataItem{
    name: string;
    value: number;
    color: string;
}

export interface Points {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
}