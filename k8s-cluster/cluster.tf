resource "vultr_kubernetes" "k8" {
    region  = "sto"
    label   = "vke-test"
    version = "v1.28.3+2"
    
    node_pools {
        node_quantity = 1
        plan          = "vc2-1c-2gb"
        label         = "vke-nodepool"
        auto_scaler   = false
        min_nodes     = 1
        max_nodes     = 1
    }
}