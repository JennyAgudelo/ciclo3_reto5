package com.mintic.usa.AlquilerBarcos.Service;

import com.mintic.usa.AlquilerBarcos.Repository.BoatRepository;
import com.mintic.usa.AlquilerBarcos.Modelo.Boat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoatService {
    @Autowired
    private BoatRepository boatRepository;

    public List<Boat> getAll(){
        return boatRepository.getAll();
    }
    public Optional<Boat> getBoat(int id){
        return boatRepository.getBoat(id);
    }
    public Boat save(Boat boat){
        if(boat.getId() == null){
            return boatRepository.save(boat);
        }else{
            Optional<Boat> b = boatRepository.getBoat(boat.getId());
            if(b.isPresent()){
                return boat;
            }else{
                return boatRepository.save(boat);
            }
        }
    }

    public  Boat update(Boat boat){
        if(boat.getId() !=null){
            Optional<Boat> b=boatRepository.getBoat(boat.getId());
            if(b.isPresent()){
                if(boat.getName()!= null){
                    b.get().setName(boat.getName());
                }
                if(boat.getBrand() != null){
                    b.get().setBrand(boat.getBrand());
                }
                if(boat.getYear() != null){
                    b.get().setYear(boat.getYear());
                }
                if(boat.getDescription() != null){
                    b.get().setDescription(boat.getDescription());
                }
                if(boat.getCategory() != null){
                    b.get().setCategory(boat.getCategory());
                }
                boatRepository.save(b.get());
                return b.get();
            }else{
                return boat;
            }
        }else{
            return boat;
        }
    }
    public boolean delete(int id){
        boolean flag = false;
        Optional<Boat> b = boatRepository.getBoat(id);
        if(b.isPresent()){
            boatRepository.delete(b.get());
            flag = true;
        }
        return flag;
    }
}
