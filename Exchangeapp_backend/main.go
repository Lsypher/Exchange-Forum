package main

import (
	"context"
	"exchangeapp/config"
	"exchangeapp/jobs"
	"exchangeapp/router"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"
)

func main() {
	config.InitConfig()

	config.InitDB()

	config.InitRedis()

	// 启动汇率定时任务
	if config.AppConfig.ExchangeRate.Enabled {
		job := jobs.NewExchangeRateJob()
		job.Start()
		defer job.Stop()
	}

	r := router.SetupRouter()

	srv := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Println("Shutdown Server ...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown:", err)
	}
	log.Println("Server exiting")
}
