using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class Transition : MonoBehaviour
{
	MeshRenderer m_Renderer;

	public GameObject sphere;

	private bool transitioning = false;
	public float speed = 0.01f;
	public float acceleration = 0.05f;
	private float t0;
	private GameObject tripod;

	private Vector3 originalScale;
	private Vector3 focusedScale;

	private GameObject parentSphere;
	private bool inNextSphere = false;

    private bool rotating = false;

	void Start ()
	{
		Debug.Log ("Starting");
		originalScale = transform.localScale;
		focusedScale = new Vector3 (0.01f, 0.01f, 0.01f) + originalScale;
		tripod = GameObject.Find ("Tripod");
		if (tripod == null) {
			throw new UnityException("Tripod GameObject not found");
		}

		parentSphere = transform.parent.gameObject;
	}

	void OnMouseOver ()
	{
		transform.localScale = focusedScale;

		if (Input.GetMouseButtonDown (0)) {
			transitioning = true;
			t0 = Time.time;

			//EventHandler.switchProject (sphere.name);
		}
	}

	void OnMouseExit ()
	{
		transform.localScale = originalScale;
	}

	void Update() {
		if (transitioning) {
            //			foreach (Renderer r in sphere.GetComponentsInChildren<Renderer> ()) {
            //				Debug.Log (r);
            //				r.enabled = false;
            //			}

          

            gameObject.GetComponent<Renderer>().enabled = false;

			float v = (speed + (acceleration * (Time.time - t0)));
		
			Vector3 movementDirection = (sphere.transform.position - parentSphere.transform.position).normalized;
			tripod.transform.position += movementDirection * v;
			float radius = parentSphere.GetComponent<Renderer> ().bounds.extents.x;

			if (!inNextSphere) {
				if ((parentSphere.transform.position - tripod.transform.position).magnitude > 0) {
					tripod.transform.position = sphere.transform.position - (movementDirection * (radius - 2f));
					inNextSphere = true;
				}
			} else {
                rotating = true;

                if (sphere.transform.Find("Pointer") != null)
                {
                    Vector3 targetDir = sphere.transform.Find("Pointer").position - tripod.transform.position;

                    if (Vector3.Angle(targetDir, tripod.transform.rotation.eulerAngles) < 1)
                    {
                        rotating = false;
                    } 

                    float step = 0.5f * Time.deltaTime;
                    Vector3 newDir = Vector3.RotateTowards(tripod.transform.forward, targetDir, step, 0.0f);
                    //Debug.DrawRay(tripod.transform.position, newDir, Color.red);
                    // Move our position a step closer to the target.
                    tripod.transform.rotation = Quaternion.LookRotation(newDir);
                }


                if (Mathf.Abs((sphere.transform.position - tripod.transform.position).magnitude) < 0.1f) {
					tripod.transform.position = sphere.transform.position;
                    // if not rotated enough, rotate till the end
                    // todo
					transitioning = false;
                    if (sphere.transform.Find("Pointer") != null)
                    {
                        tripod.transform.LookAt(sphere.transform.Find("Pointer"));
                    }
				}
			}

         
				
		} else {
			gameObject.GetComponent<Renderer>().enabled = true;

			foreach (Renderer r in sphere.GetComponentsInChildren<Renderer> ()) {
				r.enabled = true;
			}

	
		}
	}
		
}
