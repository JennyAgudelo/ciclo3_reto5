package com.mintic.usa.AlquilerBarcos.Repository.Crud;

import com.mintic.usa.AlquilerBarcos.Modelo.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {

    @Query("select c.client, count(c.client) from Reservation  as c group by c.client order by count(c.client) desc")
    public List<Object[]> countTotalReservationsByClients();

    public  List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date dateOne, Date dateTwo);

    public List<Reservation> findAllByStatus(String status);
}
