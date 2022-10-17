package com.mintic.usa.AlquilerBarcos.Web;

import com.mintic.usa.AlquilerBarcos.Service.BoatService;
import com.mintic.usa.AlquilerBarcos.Modelo.Boat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Boat")
@CrossOrigin(origins="*", methods = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE})
public class BoatController {
    @Autowired
    private BoatService boatService;

    @GetMapping("/all")
    public List<Boat> getBoats(){
        return boatService.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Boat> getBoat(@PathVariable("id")int id){
        return boatService.getBoat(id);
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Boat save(@RequestBody Boat boat){
        return boatService.save(boat);
    }
    @PutMapping("/update")
    public Boat update(@RequestBody Boat boat){
        return boatService.update(boat);
    }
    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable("id") int id){
        return boatService.delete(id);
    }

}
