#Write-Host "hola"
Set-Variable -Name "STORE_API_BASE" -Value (docker images | grep store_api_base)
Write-Host $STORE_API_BASE
if( !$STORE_API_BASE ){
    cd .\store_api\
    #get-content Dockerfile
    docker build -t store_api_base .
    cd ..
}
cd .\dashboard\frontend\
invoke-expression 'cmd /c start powershell -Command { npm run dev }'
cd ..
cd ..
docker-compose up db redis store_api api_gw