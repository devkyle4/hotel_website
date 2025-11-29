import { supabase } from "../config/supabase"


export const getAllRooms = async () => {
    const { data, error } = await supabase
        .from("rooms")
        .select('*, amenities(*)')

    if (error) throw error;

    return data;
};

export const createRoom = async(roomData: any) =>{
    const {data, error} = await supabase
        .from('rooms')
        .insert(roomData)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateRoom = async(id: number, roomData:any)=>{
    const {data, error} = await supabase
        .from('rooms')
        .update(roomData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

const deleteRoom = async (id: number) => {
    const {error} = await supabase
        .from('rooms')
        .delete()
        .eq('id', id);

    if(error) throw error;
};
