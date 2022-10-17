package com.mintic.usa.AlquilerBarcos.Service;

import com.mintic.usa.AlquilerBarcos.Modelo.Admin;
import com.mintic.usa.AlquilerBarcos.Modelo.Boat;
import com.mintic.usa.AlquilerBarcos.Repository.AdminRepository;
import com.mintic.usa.AlquilerBarcos.Repository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll(){
        return adminRepository.getAll();
    }
    public Optional<Admin> getAdmin(int id){
        return adminRepository.getAdmin(id);
    }
    public Admin save(Admin admin){
        if(admin.getIdAdmin() == null){
            return adminRepository.save(admin);
        }else{
            Optional<Admin> b = adminRepository.getAdmin(admin.getIdAdmin());
            if(b.isPresent()){
                return admin;
            }else{
                return adminRepository.save(admin);
            }
        }
    }
    public  Admin update(Admin admin){
        if(admin.getIdAdmin() !=null){
            Optional<Admin> b=adminRepository.getAdmin(admin.getIdAdmin());
            if(b.isPresent()){
                if(admin.getEmail()!= null){
                    b.get().setEmail(admin.getEmail());
                }
                if(admin.getName() != null){
                    b.get().setName(admin.getName());
                }
                if(admin.getPassword() != null){
                    b.get().setPassword(admin.getPassword());
                }
                adminRepository.save(b.get());
                return b.get();
            }else{
                return admin;
            }
        }else{
            return admin;
        }
    }
    public boolean delete(int id){
        boolean flag = false;
        Optional<Admin> b = adminRepository.getAdmin(id);
        if(b.isPresent()){
            adminRepository.delete(b.get());
            flag = true;
        }
        return flag;
    }
}
