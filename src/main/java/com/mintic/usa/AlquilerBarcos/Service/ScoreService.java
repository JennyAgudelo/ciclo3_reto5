package com.mintic.usa.AlquilerBarcos.Service;

import com.mintic.usa.AlquilerBarcos.Modelo.Reservation;
import com.mintic.usa.AlquilerBarcos.Repository.ScoreRepository;
import com.mintic.usa.AlquilerBarcos.Modelo.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }
    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }
    public Score save(Score score){
        if(score.getIdScore() == null){
            return scoreRepository.save(score);
        }else{
            Optional<Score> s = scoreRepository.getScore(score.getIdScore());
            if(s.isPresent()){
                return score;
            }else{
                return scoreRepository.save(score);
            }
        }
    }
    public Score update(Score score){
        if(score.getIdScore() != null){
            Optional<Score> s = scoreRepository.getScore(score.getIdScore());
            if(s.isPresent()){
                if(score.getMessageText() != null){
                    s.get().setMessageText(score.getMessageText());
                }
                if(score.getStars() != null){
                    s.get().setStars(score.getStars());
                }
                scoreRepository.save(s.get());
                return s.get();
            }else{
                return score;
            }
        }else{
            return score;
        }
    }
    public boolean delete(int id){
        boolean flag = false;
        Optional<Score> r = scoreRepository.getScore(id);
        if(r.isPresent()){
            scoreRepository.delete(r.get());
            flag = true;
        }
        return flag;
    }
}
